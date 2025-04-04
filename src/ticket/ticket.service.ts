import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTicketDto } from './dto/createTicket.dto';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}

  // 티켓 예약
  async reservationTicket(createTicketDto: CreateTicketDto) {
    const { schedule_id, user_id, seat_id, price, status } = createTicketDto;
    const seat = await this.prisma.seat.findUnique({
      where: { id: seat_id },
    });

    if (!seat) {
      throw new NotFoundException('Seat not found');
    }

    const existingTicket = await this.prisma.ticket.findFirst({
      where: { seat_id, schedule_id },
    });

    if (existingTicket) {
      throw new BadRequestException('Seat is already reserved');
    }

    const schedule = await this.prisma.schedule.findUnique({
      where: { id: schedule_id },
    });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    const ticket = await this.prisma.ticket.create({
      data: {
        schedule_id,
        user_id,
        seat_id,
        price,
        status,
      },
    });

    return {
      ...ticket,
      id: ticket.id.toString(),
      seat_id: ticket.seat_id.toString(),
      schedule_id: ticket.schedule_id.toString(),
      user_id: ticket.user_id.toString(),
    };
  }

  // 티켓 조회
  async getTicketById(ticketId: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { user: { select: { email: true } } },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${ticketId} not found`);
    }

    return {
      ...ticket,
      id: ticket.id.toString(),
      user_id: ticket.user_id?.toString(),
      schedule_id: ticket.schedule_id?.toString(),
      seat_id: ticket.seat_id?.toString(),
    };
  }

  // 티켓 삭제
  async deleteTicketById(ticketId: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${ticketId} not found`);
    }

    await this.prisma.ticket.delete({
      where: { id: ticketId },
    });

    return { message: 'Ticket deleted successfully' };
  }
}

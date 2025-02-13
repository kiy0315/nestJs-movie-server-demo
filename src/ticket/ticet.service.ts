import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTicketDto } from './dto/createTicket.dto';

@Injectable()
export class TicketService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async reservationTicket(createTicketDto: CreateTicketDto) {
    const { schedule_id, user_id, seat_id, price, status } = createTicketDto;

    const lockKey = `seat_lock:${seat_id}`;
    const lockValue = `user:${user_id}`;
    const ttl = 30; 

    const lockAcquired = await this.redisService.setLock(
      lockKey,
      lockValue,
      ttl,
    );

    if (!lockAcquired) {
      throw new BadRequestException(
        'Seat is already reserved or being processed',
      );
    }
    const transaction = await this.prisma.$transaction(async (prisma) => {
      const seat = await prisma.seat.findUnique({
        where: { id: seat_id },
      });

      if (!seat) {
        await this.redisService.releaseLock(lockKey); 
        throw new NotFoundException('Seat not found');
      }

      const existingTicket = await prisma.ticket.findFirst({
        where: { seat_id, schedule_id },
      });

      if (existingTicket) {
        await this.redisService.releaseLock(lockKey); 
        throw new BadRequestException('Seat is already reserved');
      }

      const ticket = await prisma.ticket.create({
        data: {
          schedule_id,
          user_id,
          seat_id,
          price,
          status,
        },
      });

      return ticket; 
    });

    await this.redisService.releaseLock(lockKey);

    return transaction; 
  }

  async getTicketById(ticketId: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        user: { select: { email: true } },
        seat: { select: { row_num: true, col_num: true } },
        schedule: {
          select: { start_time: true, end_time: true },
          include: {
            movie: { select: { title: true, running_time: true } },
            screen: {
              select: {
                screen_number: true,
                hall: true,
                floor: true,
                screen_type: true,
              },
            },
          },
        },
      },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${ticketId} not found`);
    }

    return ticket;
  }

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

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTicketDto } from './dto/createTicket.dto';
import { TicketGateway } from '../socket/socket.gateway';
@Injectable()
export class TicketService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
    private readonly ticketGateway: TicketGateway,
  ) {}

  async reservationTicket(createTicketDto: CreateTicketDto) {
    const { schedule_id, user_id, seat_id } = createTicketDto;
    const bigIntScheduleId = BigInt(schedule_id);
    const bigIntUserId = BigInt(user_id);
    const bigIntSeatId = BigInt(seat_id);

    const lockKey = `seat_lock:${bigIntSeatId}`;
    const lockValue = `user:${bigIntUserId}`;
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

    try {
      const seat = await this.prisma.seat.findUnique({
        where: { id: bigIntSeatId },
      });

      if (!seat) {
        throw new NotFoundException('Seat not found');
      }

      const existingTicket = await this.prisma.ticket.findFirst({
        where: { seat_id: bigIntSeatId, schedule_id: bigIntScheduleId },
      });
      if (existingTicket) {
        throw new BadRequestException('Seat is already reserved');
      }

      const transaction = await this.prisma.$transaction(async (prisma) => {
        const ticket = await prisma.ticket.create({
          data: {
            schedule_id: bigIntScheduleId,
            user_id: bigIntUserId,
            seat_id: bigIntSeatId,
            price: seat.price,
            status: seat.status,
          },
        });
        await prisma.seat.update({
          where: { id: bigIntSeatId },
          data: { status: 'reserved' },
        });

        return ticket;
      });

      this.ticketGateway.handleSeatUpdate({
        seat_id: bigIntSeatId.toString(),
        status: 'reserved',
      });
      return {
        ...transaction,
        id: transaction.id.toString(),
        schedule_id: transaction.schedule_id.toString(),
        user_id: transaction.user_id.toString(),
        seat_id: transaction.seat_id.toString(),
      };
    } catch (error) {
      // 예외 상황 처리: 예외를 다시 던지기 전에 상태 코드 처리
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message); // 404 상태 코드 반환
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message); // 400 상태 코드 반환
      }

      // 기본적인 서버 에러 처리
      throw new InternalServerErrorException('Unexpected error occurred');
    } finally {
      await this.redisService.releaseLock(lockKey);
    }
  }

  async getTicketById(ticketId: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: BigInt(ticketId) },
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

    return {
      ...ticket,
      id: ticket.id.toString(),
    };
  }

  async deleteTicketById(ticketId: number) {
    const ticket = await this.prisma.ticket.delete({
      where: { id: BigInt(ticketId) },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${ticketId} not found`);
    }

    return { message: 'Ticket deleted successfully' };
  }
}

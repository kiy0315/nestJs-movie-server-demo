import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisModule } from '../redis/redis.module';
import { TicketGateway } from '../socket/socket.gateway';

@Module({
  imports: [RedisModule],
  controllers: [TicketController],
  providers: [TicketService, PrismaService, TicketGateway],
})
export class TicketModule {}

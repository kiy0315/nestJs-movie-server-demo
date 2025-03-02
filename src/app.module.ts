import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { PrismaService } from '../prisma/prisma.service';
import { TicketModule } from './ticket/ticket.module';
import { ScheduleModule } from './schedule/schedule.module';
import { TheaterModule } from './theater/theater.module';
import { ChatModule } from './chat/chat.module';
@Module({
  imports: [MovieModule, TicketModule, ScheduleModule, TheaterModule,ChatModule],
  providers: [PrismaService],
})
export class AppModule {}

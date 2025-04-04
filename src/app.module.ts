import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { TheaterModule } from './Theater/theater.module';
import { TicketModule } from './ticket/ticket.module';
import { ScheduleModule } from './schedule/schedule.module';
import { RedisModule } from './redis/redis.module';
import { GenreModule } from './genre/genre.module';

import { PrismaService } from '../prisma/prisma.service';
@Module({
  imports: [
    MovieModule,
    TheaterModule,
    TicketModule,
    ScheduleModule,
    RedisModule,
    GenreModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}

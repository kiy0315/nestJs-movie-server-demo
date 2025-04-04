import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import {} from './Theater/theater.module';
import {} from './ticket/ticket.module';
import {} from './schedule/schedule.module';
import {} from './redis/redis.module';
import {} from './genre/genre.module';

import { PrismaService } from '../prisma/prisma.service';
@Module({
  imports: [MovieModule],
  providers: [PrismaService],
})
export class AppModule {}

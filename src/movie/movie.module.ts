import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaService } from '../../prisma/prisma.service'; // Prisma 서비스 추가

@Module({
  controllers: [MovieController],
  providers: [MovieService, PrismaService], // PrismaService 주입
})
export class MovieModule {}

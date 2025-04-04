import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { PrismaService } from '../../prisma/prisma.service'; // Prisma 서비스 추가

@Module({
  controllers: [GenreController],
  providers: [GenreService, PrismaService], // PrismaService 주입
})
export class GenreModule {}

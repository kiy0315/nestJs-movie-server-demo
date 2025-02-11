import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { PrismaService } from '../prisma/prisma.service'; // PrismaService import

@Module({
  imports: [MovieModule],
  providers: [PrismaService], // PrismaService를 providers에 추가
})
export class AppModule {}

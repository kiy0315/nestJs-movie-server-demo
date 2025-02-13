import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { PrismaService } from '../../prisma/prisma.service'; // Prisma 서비스 추가

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService], // PrismaService 주입
})
export class ScheduleModule {}

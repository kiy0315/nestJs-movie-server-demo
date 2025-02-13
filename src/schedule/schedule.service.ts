import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateScheduleDto } from './dto/createSchedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async createSchedule(createScheduleDto: CreateScheduleDto) {
    return await this.prisma.schedule.create({
      data: {
        movie_id: createScheduleDto.movie_id,
        screen_id: createScheduleDto.screen_id,
        start_time: createScheduleDto.start_time,
        end_time: createScheduleDto.end_time,
      },
    });
  }

  async getAllSchedule() {
    return await this.prisma.schedule.findMany({
      include: {
        movies: {
          select: {
            title: true,
            runningTime: true,
          },
        },
      },
    });
  }

  async getScheduleById(scheduleId: number) {
    try {
      return await this.prisma.schedule.findUnique({
        where: { id: scheduleId },
        include: {
          movies: {
            select: {
              id: true,
              title: true,
              summary: true, // 예시로 필요한 필드 추가
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteSchedule(scheduleId: number) {
    try {
      return await this.prisma.schedule.delete({
        where: { id: scheduleId },
      });
    } catch (error) {
      throw new NotFoundException('Schedule not found');
    }
  }
}

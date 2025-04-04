import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateScheduleDto } from './dto/createSchedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async createSchedule(createScheduleDto: CreateScheduleDto) {
    const schedule = await this.prisma.schedule.create({
      data: {
        movie_id: BigInt(createScheduleDto.movie_id),
        screen_id: BigInt(createScheduleDto.screen_id),
        start_time: createScheduleDto.start_time,
        end_time: createScheduleDto.end_time,
      },
    });

    return {
      ...schedule,
      id: schedule.id.toString(),
    };
  }

  async getAllSchedule() {
    const schedules = await this.prisma.schedule.findMany({
      include: {
        movie: {
          select: {
            title: true,
            running_time: true,
          },
        },
      },
    });
    return schedules.map((schedule) => ({
      ...schedule,
      id: schedule.id.toString(),
    }));
  }

  async getScheduleById(scheduleId: number) {
    try {
      const schedule = await this.prisma.schedule.findUnique({
        where: { id: scheduleId },
        include: {
          movie: {
            select: {
              id: true,
              title: true,
              summary: true,
              running_time: true,
            },
          },
        },
      });

      return {
        ...schedule,
        id: schedule.id.toString(),
      };
    } catch (error) {
      console.error(error);
    }
  }

  async deleteSchedule(scheduleId: number) {
    try {
      const schedule = await this.prisma.schedule.delete({
        where: { id: BigInt(scheduleId) },
      });

      if (!schedule) {
        throw new NotFoundException(`Schedule with ID ${scheduleId} not found`);
      }
      return { message: 'schedule deleted successfully' };
    } catch (error) {
      throw new NotFoundException('Schedule not found');
    }
  }
}

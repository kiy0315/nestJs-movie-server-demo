import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/createSchedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.createSchedule(createScheduleDto);
  }

  @Get()
  async getAllSchedule() {
    return this.scheduleService.getAllSchedule();
  }

  @Get(':scheduleId')
  async getScheduleById(@Param('scheduleId') scheduleId: number) {
    return this.scheduleService.getScheduleById(scheduleId);
  }

  // 날짜를 선택해서 보여주기 로직 구현
//   @Get()
//   async getScheduleByDate(@Body() getScheduleByDateDto: getScheduleByDateDto) {
//     return this.scheduleService.getScheduleByDate(getScheduleByDateDto);
//   }

  @Delete(':scheduleId')
  async deleteSchedule(@Param('schedule') scheduleId: number) {
    return this.scheduleService.deleteSchedule(scheduleId);
  }
}

import { IsNotEmpty, IsDate } from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  movie_id: number; // movie 연결

  @IsNotEmpty()
  screen_id: number; // screen 연결
  @IsDate()
  @IsNotEmpty()
  start_time: string; // Prisma의 DateTime 타입과 일치하도록 Date 객체 사용

  @IsDate()
  @IsNotEmpty()
  end_time: string; // Prisma의 DateTime 타입과 일치하도록 Date 객체 사용
}

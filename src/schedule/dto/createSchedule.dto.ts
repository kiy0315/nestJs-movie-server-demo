import { IsNotEmpty, IsDate } from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  movie_id: number;

  @IsNotEmpty()
  screen_id: number;

  @IsDate()
  @IsNotEmpty()
  start_time: string;  // Prisma의 DateTime 타입과 일치하도록 Date 객체 사용

  @IsDate()
  @IsNotEmpty()
  end_time: string;  // Prisma의 DateTime 타입과 일치하도록 Date 객체 사용
  
}

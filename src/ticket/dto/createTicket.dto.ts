import {
  IsInt,
  IsOptional,
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateTicketDto {
  @IsInt()
  @IsNotEmpty()
  schedule_id: number;
  @IsInt()
  @IsNotEmpty()
  user_id: number;
  @IsInt()
  @IsNotEmpty()
  seat_id: number;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}

import {
  IsInt,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsInt()
  running_time: number;

  @IsString()
  @IsNotEmpty()
  country_code: string;

  @IsString()
  @IsNotEmpty()
  language: string;
}

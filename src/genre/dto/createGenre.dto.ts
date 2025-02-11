import {
  IsInt,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';
export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}

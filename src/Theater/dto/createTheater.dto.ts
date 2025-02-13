import {
  IsInt,
  IsString,
  MaxLength,
  IsArray,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

export class CreateTheaterDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  @IsNotEmpty()
  address_id: number;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsString()
  @IsNotEmpty()
  email: string;
}

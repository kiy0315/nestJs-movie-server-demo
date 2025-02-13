import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { CreateTheaterDto } from './dto/createTheater.dto';

@Controller('theaters')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) {}

  @Post()
  async createTheater(@Body() createTheaterDto: CreateTheaterDto) {
    return this.theaterService.createTheater(createTheaterDto);
  }

  @Get()
  async getAllTheaters() {
    return this.theaterService.getAllTheaters();
  }

  @Get(':id')
  async getTheaterById(@Param('id') id: number) {
    return this.theaterService.getTheaterById(id);
  }

  @Delete(':id')
  async deleteTheater(@Param('id') id: number) {
    return this.theaterService.deleteTheater(id);
  }
}

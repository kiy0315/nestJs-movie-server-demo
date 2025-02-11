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
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/createGenre.dto';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.createGenre(createGenreDto);
  }

  @Get()
  async getAllGenre() {
    return this.genreService.getAllGenre();
  }

  @Delete(':genreId')
  async deleteGenre(@Param('genreId') genreId: number) {
    return this.genreService.deleteGenre(genreId);
  }
}

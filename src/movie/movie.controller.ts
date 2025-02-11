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
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/createMovie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.createMovie(createMovieDto);
  }

  @Get()
  async getAllMovies() {
    return this.movieService.getAllMovies();
  }

  @Get(':movieId')
  async getMovieById(@Param('movieId') movieId: number) {
    return this.movieService.getMovieById(movieId);
  }

  @Get(':genreId') // 장르 id의 값을 카테고리로 받을건지에 대한 고민
  async getMoviesByGenreId(@Param('genreId') genreId: number) {
    return this.movieService.getMovieByCategory(genreId);
  }

  @Delete(':movieId')
  async deleteMovie(@Param('movieId') movieId: number) {
    return this.movieService.deleteMovie(movieId);
  }
}

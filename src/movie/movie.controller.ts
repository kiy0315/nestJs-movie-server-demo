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
    const movie = await this.movieService.getMovieById(movieId);
    return {
      ...movie,
      id: movie.id.toString(),
    };
  }
  @Delete(':movieId')
  async deleteMovie(@Param('movieId') movieId: number) {
    return this.movieService.deleteMovie(movieId);
  }
}

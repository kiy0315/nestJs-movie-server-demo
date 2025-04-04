import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMovieDto } from './dto/createMovie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async createMovie(createMovieDto: CreateMovieDto) {
    const movie = await this.prisma.movie.create({
      data: createMovieDto,
    });
    return {
      ...movie,
      id: movie.id.toString(),
    };
  }

  async getAllMovies() {
    const movies = await this.prisma.movie.findMany();
    return movies.map((movie) => ({
      ...movie,
      id: movie.id.toString(),
    }));
  }

  async getMovieById(movieId: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: BigInt(movieId) },
    });

    if (!movie) throw new NotFoundException('Movie not found');

    return movie;
  }

  async deleteMovie(movieId: number) {
    try {
      const movie = await this.prisma.movie.delete({
        where: { id: BigInt(movieId) },
      });
      if (!movie)
        throw new NotFoundException(`Ticket with ID ${movieId} not found`);

      return { message: 'movie deleted successfully' };
    } catch (error) {
      throw new NotFoundException('Movie not found');
    }
  }
}

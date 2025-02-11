import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMovieDto } from './dto/createMovie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async createMovie(createMovieDto: CreateMovieDto) {
    return await this.prisma.movie.create({
      data: createMovieDto,
    });
  }

  async getAllMovies() {
    return await this.prisma.movie.findMany({
      include: {
        genre: { select: { title: true } },
        rating: { select: { rating: true } },
      },
    });
  }

  async getMovieById(movieId: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
      include: {
        genre: { select: { title: true } },
        rating: { select: { rating: true } },
      },
    });

    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async getMovieByCategory(genreId: number) {
    return await this.prisma.movie.findMany({
      where: { genreId },
      include: {
        genre: { select: true },
        rating: { select: true },
      },
    });
  }

  async deleteMovie(movieId: number) {
    try {
      await this.prisma.movie.delete({
        where: { id: movieId },
      });
    } catch (error) {
      throw new NotFoundException('Movie not found');
    }
  }
}

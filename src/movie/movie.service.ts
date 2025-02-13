import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMovieDto } from './dto/createMovie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async createMovie(createMovieDto: CreateMovieDto) {
    return await this.prisma.movies.create({
      data: createMovieDto,
    });
  }

  async getAllMovies() {
    return await this.prisma.movies.findMany();
  }

  async getMovieById(movieId: number) {
    const movie = await this.prisma.movies.findUnique({
      where: { id: movieId },
    });

    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  // async getMovieByCategory(genreId: number) {
  //   return await this.prisma.movies.findMany({
  //     where: { genreId: genreId },
  //     include: {
  //       genre: { select: { title: true } },
  //       rating: { select: { rating: true } },
  //     },
  //   });
  // }

  async deleteMovie(movieId: number) {
    try {
      return await this.prisma.movies.delete({
        where: { id: movieId },
      });
    } catch (error) {
      throw new NotFoundException('Movie not found');
    }
  }
}

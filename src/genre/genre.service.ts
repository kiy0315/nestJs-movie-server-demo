import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGenreDto } from './dto/createGenre.dto';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async createGenre(createGenreDto: CreateGenreDto) {
    return await this.prisma.genre.create({
      data: createGenreDto,
    });
  }

  async getAllGenre() {
    return await this.prisma.genre.findMany();
  }

  async deleteGenre(genreId: number) {
    try {
      const genre = await this.prisma.genre.delete({
        where: { id: genreId },
      });
    } catch (error) {
      throw new NotFoundException('Genre not found');
    }
  }
}

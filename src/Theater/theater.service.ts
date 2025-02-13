import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTheaterDto } from './dto/createTheater.dto';

@Injectable()
export class TheaterService {
  constructor(private readonly prisma: PrismaService) {}

  async createTheater(createTheaterDto: CreateTheaterDto) {
    return await this.prisma.theater.create({
      data: createTheaterDto,
    });
  }

  async getAllTheaters() {
    return await this.prisma.theater.findMany();
  }

  async getTheaterById(theaterId: number) {
    const theater = await this.prisma.theater.findUnique({
      where: { id: theaterId },
    });

    if (!theater) throw new NotFoundException('Theater not found');
    return theater;
  }

  async deleteTheater(theaterId: number) {
    try {
      return await this.prisma.theater.delete({
        where: { id: theaterId },
      });
    } catch (error) {
      throw new NotFoundException('Theater not found');
    }
  }
}

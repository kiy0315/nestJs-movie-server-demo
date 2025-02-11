import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';

@Module({
  imports: [SequelizeModule.forFeature([Movie])], // Sequelize 모델 등록
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}

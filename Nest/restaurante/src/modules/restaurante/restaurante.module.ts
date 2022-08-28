import { RestauranteService } from './restaurante.service';
import { RestauranteController } from './restaurante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurante } from './entities/restaurante.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurante])],
  controllers: [RestauranteController],
  providers: [RestauranteService],
})
export class RestauranteModule {}

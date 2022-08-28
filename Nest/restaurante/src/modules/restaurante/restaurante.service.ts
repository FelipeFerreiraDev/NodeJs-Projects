import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';
import { Restaurante } from './entities/restaurante.entity';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(Restaurante)
    private restaurantesRepository: Repository<Restaurante>,
  ) {}
  async create(createRestauranteDto: CreateRestauranteDto) {
    const { name, endereco, horario, password } = createRestauranteDto;

    const user = await this.restaurantesRepository.save({
      name,
      endereco,
      horario,
      password,
    });

    return user;
  }

  findAll() {
    return `This action returns all restaurante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurante`;
  }

  update(id: number, updateRestauranteDto: UpdateRestauranteDto) {
    return `This action updates a #${id} restaurante`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurante`;
  }
}

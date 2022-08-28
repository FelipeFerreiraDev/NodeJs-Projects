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

  async findAll() {
    return await this.restaurantesRepository.find();
  }

  async findOne(id: string) {
    return await this.restaurantesRepository.find({ where: { id: id } });
  }

  update(id: number, updateRestauranteDto: UpdateRestauranteDto) {
    return `This action updates a #${id} restaurante`;
  }

  async remove(id: string) {
    const response = await this.restaurantesRepository.delete(id);

    if (!response) {
      throw new Error('Restaurante não encontrado');
    }

    return `Restaurante Deletado`;
  }
}

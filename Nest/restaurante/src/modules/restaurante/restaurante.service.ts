import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { AppError } from 'src/shared/errors/AppError';
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

    const restaurante = await this.restaurantesRepository.save({
      name,
      endereco,
      horario,
      password,
    });

    return restaurante;
  }

  async findAll() {
    return await this.restaurantesRepository.find();
  }

  async findOne(id: string) {
    return await this.restaurantesRepository.find({
      where: { id },
    });
  }

  /*
  update(dto: { id: string }, updateRestauranteDto: UpdateRestauranteDto) {
    try {
      const { name, endereco, horario, password } = updateRestauranteDto;

      const user = this.restaurantesRepository.update(dto.id, {
        name,
        endereco,
        horario,
        password,
      });

      return user;
    } catch (err) {}
  }
  */

  async update(id: string, updateRestauranteDto: UpdateRestauranteDto) {
    const { name, endereco, horario, password } = updateRestauranteDto;

    await this.restaurantesRepository.update(id, {
      name,
      endereco,
      horario,
      password,
    });

    return `Restaurante Atualizado`;
  }

  async remove(id: string) {
    await this.restaurantesRepository.delete(id);

    return `Restaurante Deletado`;
  }
}

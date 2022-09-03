import { PartialType } from '@nestjs/mapped-types';
import { CreateRestauranteDto } from './create-restaurante.dto';

export class UpdateRestauranteDto extends PartialType(CreateRestauranteDto) {
  name?: string;
  endereco?: string;
  horario?: string;
  password?: string;
}

import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Restaurante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  endereco: string;

  @Column()
  horario: string;
}

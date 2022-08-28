import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('restaurante')
export class Restaurante {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  endereco: string;

  @Column({ nullable: false })
  horario: string;

  @Column({ nullable: false })
  password: string;
}

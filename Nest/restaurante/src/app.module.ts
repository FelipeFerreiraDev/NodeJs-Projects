import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteModule } from './modules/restaurante/restaurante.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'postgres',
      entities: [],
      synchronize: true,
    }),
    RestauranteModule,
  ],
})
export class AppModule {}

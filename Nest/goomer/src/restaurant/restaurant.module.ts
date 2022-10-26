import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { RestaurantService } from 'src/services/prisma/restaurant.service';
import { RestaurantController } from './restaurant.controller';

@Module({
  controllers: [RestaurantController],
  providers: [PrismaService, RestaurantService],
})
export class RestaurantModule {}

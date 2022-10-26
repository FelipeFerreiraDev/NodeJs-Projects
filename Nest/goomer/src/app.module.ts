import { Module } from '@nestjs/common';
import { ProductService } from './services/prisma/product.service';
import { RestaurantService } from './services/prisma/restaurant.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { PrismaService } from './services/prisma/prisma.service';

@Module({
  imports: [RestaurantModule],
  providers: [PrismaService, ProductService, RestaurantService],
})
export class AppModule {}

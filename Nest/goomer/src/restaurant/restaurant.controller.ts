import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Restaurant } from '@prisma/client';
import { RestaurantService } from 'src/services/prisma/restaurant.service';

interface RestaurantUpdateProps {
  name?: string;
  email?: string;
  password?: string;
  address?: string | null;
  operation?: string | null;
}

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  create(@Body() createRestaurantDto: Restaurant) {
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @Get()
  findAll() {
    return this.restaurantService.restaurantsList();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.restaurant({ id: id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: RestaurantUpdateProps,
  ) {
    return this.restaurantService.updateRestaurant({
      where: { id: id },
      data: updateRestaurantDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.deleteRestaurant({ id: id });
  }
}

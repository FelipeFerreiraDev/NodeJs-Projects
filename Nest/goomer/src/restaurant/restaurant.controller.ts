import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Restaurant } from '@prisma/client';
import { diskStorage } from 'multer';
import { RestaurantService } from 'src/services/prisma/restaurant.service';
import { extname } from 'path';

interface RestaurantUpdateProps {
  name?: string;
  email?: string;
  password?: string;
  address?: string | null;
  operation?: string | null;
  logo?: string | null;
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './tmp/logo',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);

          const ext = extname(file.originalname);

          const filename = `${ext}-${uniqueSuffix}-${ext}`;

          callback(null, filename);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: RestaurantUpdateProps,
    @UploadedFile() file: Express.Multer.File,
  ) {
    updateRestaurantDto.logo = file.path;

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

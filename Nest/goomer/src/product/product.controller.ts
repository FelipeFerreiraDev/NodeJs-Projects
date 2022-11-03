import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductService } from 'src/services/prisma/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: Product): Promise<Product> {
    const {
      title,
      content,
      category,
      date,
      price,
      promotionalPrice,
      restaurantId,
    } = createProductDto;

    return this.productService.createProduct({
      title,
      content,
      category,
      date,
      price,
      promotionalPrice,
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
    });
  }

  @Get()
  findAll() {
    return this.productService.productsList();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.product({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: Product) {
    return this.productService.updateProduct({
      where: { id },
      data: updateProductDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.deleteProduct({ id: +id });
  }
}

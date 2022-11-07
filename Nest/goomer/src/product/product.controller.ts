import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from '@prisma/client';
import { diskStorage } from 'multer';
import { extname } from 'path';
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './tmp/product',
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
    @Param('id') id: number,
    @Body() updateProductDto: Product,
    @UploadedFile() file: Express.Multer.File,
  ) {
    updateProductDto.image = file.path;

    return this.productService.updateProduct({
      where: { id: +id },
      data: updateProductDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.deleteProduct({ id: +id });
  }
}

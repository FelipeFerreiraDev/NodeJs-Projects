import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Restaurant, Prisma, Product } from '@prisma/client';

export interface RestaurantProductProps {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string | null;
  operation: string | null;
  products: Product[];
}
@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async restaurant(
    restaurantWhereUniqueInput: Prisma.RestaurantWhereUniqueInput,
  ): Promise<RestaurantProductProps | null> {
    return this.prisma.restaurant.findUnique({
      where: restaurantWhereUniqueInput,
      include: {
        products: true,
      },
    });
  }

  async restaurants(params: { id: string }): Promise<RestaurantProductProps> {
    const { id } = params;
    return this.prisma.restaurant.findUnique({
      where: {
        id: id,
      },
      include: {
        products: true,
      },
    });
  }

  async restaurantsList(): Promise<RestaurantProductProps[]> {
    return this.prisma.restaurant.findMany({
      include: {
        products: true,
      },
    });
  }

  async createRestaurant(
    data: Prisma.RestaurantCreateInput,
  ): Promise<Restaurant> {
    return this.prisma.restaurant.create({
      data,
    });
  }

  async updateRestaurant(params: {
    where: Prisma.RestaurantWhereUniqueInput;
    data: Prisma.RestaurantUpdateInput;
  }): Promise<Restaurant> {
    const { where, data } = params;
    return this.prisma.restaurant.update({
      data,
      where,
    });
  }

  async deleteRestaurant(
    where: Prisma.RestaurantWhereUniqueInput,
  ): Promise<Restaurant> {
    await this.prisma.restaurant.update({
      where,
      data: {
        products: {
          deleteMany: {},
        },
      },
    });

    return this.prisma.restaurant.delete({
      where,
    });
  }
}

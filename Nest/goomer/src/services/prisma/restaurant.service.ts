import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Restaurant, Prisma } from '@prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async restaurant(
    restaurantWhereUniqueInput: Prisma.RestaurantWhereUniqueInput,
  ): Promise<Restaurant | null> {
    return this.prisma.restaurant.findUnique({
      where: restaurantWhereUniqueInput,
    });
  }

  async restaurants(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RestaurantWhereUniqueInput;
    where?: Prisma.RestaurantWhereInput;
    orderBy?: Prisma.RestaurantOrderByWithRelationInput;
  }): Promise<Restaurant[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.restaurant.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async restaurantsList(): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany();
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
    return this.prisma.restaurant.delete({
      where,
    });
  }
}

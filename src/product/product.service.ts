import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // for new product
  async createProduct(data: any) {
    try {
      return await this.prisma.product.create({
        data: {
          name: data.name,
          sku: data.sku,
          price: data.price,
          stock_quantity: data.stock_quantity,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('SKU must be unique');
      }
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  // for all product
  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  // for a specific product
  async getProductById(id: number) {
    return this.prisma.product.findUnique({ where: { id: Number(id) } });
  }
  //   for product update
  async updateProduct(id: number, data: any) {
    return this.prisma.product.update({
      where: { id: id },
      data: data,
    });
  }
  // delete a product
  async deleteProduct(id: number) {
    return this.prisma.product.delete({
      where: { id: id },
    });
  }
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}
  async createSale(data: { productId: number; quantity: number }) {
    // Validate product existence
    const product = await this.prisma.product.findUnique({
      where: { id: data.productId },
    });
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    // Validate stock availability
    if (product.stock_quantity < data.quantity) {
      throw new BadRequestException('Insufficient stock quantity');
    }
    return this.prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id: data.productId },
        data: { stock_quantity: { decrement: data.quantity } },
      });
      return tx.sale.create({
        data: {
          productId: data.productId,
          quantity: data.quantity,

          totalPrice: product.price * data.quantity,
        },
      });
    });
  }
}

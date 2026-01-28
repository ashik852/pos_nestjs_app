import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UseGuards(AuthGuard('jwt')) // বিক্রি করার জন্য লগইন মাস্ট
  @Post('create')
  async create(@Body() body: { productId: number; quantity: number }) {
    return this.salesService.createSale(body);
  }
}

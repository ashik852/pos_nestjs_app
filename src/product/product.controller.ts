import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createProduct(@Body() body: any) {
    return this.productService.createProduct(body);
  }
  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }
  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productService.getProductById(+id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() body: any) {
    return this.productService.updateProduct(Number(id), body);
  }
  // for delete a product
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.deleteProduct(Number(id));
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    const result = await this.authService.registerUser(body);
    return result;
  }
  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body);
  }
}

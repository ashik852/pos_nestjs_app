import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';

@Injectable()
export class UserService {
  createUser(registerUserdto: RegisterDto) {
    // Logic for creating a user
    return { message: 'user created', data: registerUserdto };
  }
}

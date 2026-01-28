import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
// import { RegisterDto } from './dto/registerUser.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(data: any) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already registered!');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    // console.log('registerDto', registerUserdto);
    // const saltRounds = 10;
    // const hash = await bcrypt.hash(registerUserdto.password, saltRounds);
    // Logic for user register
    // return this.UserService.createUser({ ...registerUserdto, password: hash });
    // return { message: 'user registered' };
    // save the data to datbaese
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fname: data.fname,
        lname: data.lname,
      },
      select: { id: true, email: true, fname: true, lname: true }, // did't return password
    });
  }
  // login section
  async login(data: any) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('wrong email or password!');
    }

    // checking the password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('wrong email or password!');
    }

    // ৩. JWT টোকেন তৈরি করা
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { id: user.id, email: user.email, fname: user.fname },
    };
  }
}

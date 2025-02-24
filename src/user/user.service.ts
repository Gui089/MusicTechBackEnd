import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, Roles } from './dto/create-user.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService:PrismaService
  ){}

  async createUser(data:CreateUserDto) {

    const password_hashed = await hash(data.password, 6);

    const user = await this.prismaService.user.create({
      data:{
        name:data.name,
        email:data.email,
        password:password_hashed,
        role: data.role || Roles.STUDENT
      }
    });

    return {
      user,
    }
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/sign-in.dto';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismService:PrismaService,
    private readonly jwtService:JwtService
  ){}

  async signIn(data:LoginDto) {
    const user = await this.prismService.user.findUnique({
      where:{
        email:data.email
      }
    });


    if(!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordDoesMatches = await compare(data.password, user.password);

    if(!passwordDoesMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {sub:user.id, role:user.role};

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}

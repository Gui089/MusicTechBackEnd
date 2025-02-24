import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    UserModule,
    JwtModule.register({
      global:true,
      secret:'superSecret'
    })
  ],
  controllers:[AuthController],
  providers:[PrismaService, AuthService]
})
export class AuthModule {}

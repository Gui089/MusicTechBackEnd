import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {z} from 'zod';
import { LoginDto } from './dto/sign-in.dto';

const signInUserBodySchema = z.object({
  email:z.string().email(),
  password:z.string().min(6),
});

type SignInUserBodySchema = z.infer<typeof signInUserBodySchema>;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService) {}

  @Post('sign-in')
  async singIn(@Body() body:LoginDto) {
    const parsedBody = signInUserBodySchema.parse(body);

    const user = await this.authService.signIn({
      email:parsedBody.email,
      password:parsedBody.password
    });

    return user;
  }
}

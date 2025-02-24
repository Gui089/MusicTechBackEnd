import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {z} from 'zod';
import { CreateUserDto, Roles } from './dto/create-user.dto';

const createUserBodySchema = z.object({
  name:z.string(),
  email:z.string().email(),
  password:z.string().min(6),
  role: z.nativeEnum(Roles).optional(),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;


@Controller('user')
export class UserController {
  constructor(
    private readonly userService:UserService
  ){}

  @Post('create')
  async createUser(@Body() body:CreateUserDto) {
    const parsedBody = createUserBodySchema.parse(body);

    const user = await this.userService.createUser({
      name:parsedBody.name,
      email:parsedBody.email,
      password:parsedBody.password,
      role:parsedBody.role
    });

    return user;
  }
}

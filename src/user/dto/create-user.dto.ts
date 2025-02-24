import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum Roles {
  PROFESSOR = 'PROFESSOR',
  STUDENT = 'STUDENT'
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(Roles)
  role?: Roles;
}
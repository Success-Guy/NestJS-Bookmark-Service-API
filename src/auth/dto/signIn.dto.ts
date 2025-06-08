import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsAlphanumeric()
  @IsString()
  @IsNotEmpty()
  password: string;
}
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @IsAlphanumeric()
  @IsString()
  @IsNotEmpty()
  password: string;
}
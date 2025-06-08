import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;
  
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsAlphanumeric()
  @IsString()
  @IsNotEmpty()
  password: string;
}
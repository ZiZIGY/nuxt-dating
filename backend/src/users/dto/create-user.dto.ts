import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Gender } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  location?: string;
}

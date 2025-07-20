import { IsOptional, IsString } from 'class-validator';

export class UpdateInterestDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  emoji?: string;

  @IsOptional()
  @IsString()
  ru?: string;

  @IsOptional()
  @IsString()
  en?: string;
}

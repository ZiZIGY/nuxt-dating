import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class AddUserInterestDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  level?: number = 1;
}

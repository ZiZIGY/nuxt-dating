import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class UpdateUserInterestDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  level: number;
}

import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserInterestDto } from './user-interest.dto';

export class SimilarUserProfileDto {
  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string | null;

  @IsString()
  nickname: string;

  @IsString()
  gender: string;
}

export class SimilarUserDto {
  @IsObject()
  @ValidateNested()
  @Type(() => SimilarUserProfileDto)
  user: SimilarUserProfileDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserInterestDto)
  commonInterests: UserInterestDto[];

  @IsInt()
  count: number;
}

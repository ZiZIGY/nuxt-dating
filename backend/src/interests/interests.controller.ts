import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InterestsService } from './interests.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CreateInterestDto,
  UpdateInterestDto,
  AddUserInterestDto,
  UpdateUserInterestDto,
  UserInterestDto,
  SimilarUserDto,
} from './dto';

@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Get()
  findAll(@Query('locale') locale?: string) {
    return this.interestsService.findAll(locale);
  }

  @Get('categories')
  findAllByCategory(@Query('locale') locale?: string) {
    return this.interestsService.findAllByCategory(locale);
  }

  @Get(':id/users')
  findUsersByInterest(
    @Param('id') id: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.interestsService.findUsersByInterest(id, limit, offset);
  }

  @UseGuards(JwtAuthGuard)
  @Get('similar-users/:userId')
  findSimilarUsers(
    @Param('userId') userId: string,
    @Query('limit') limit?: number,
  ): Promise<SimilarUserDto[]> {
    return this.interestsService.findSimilarUsers(userId, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  findUserInterests(
    @Param('userId') userId: string,
    @Query('locale') locale?: string,
  ): Promise<UserInterestDto[]> {
    return this.interestsService.findUserInterests(userId, locale);
  }

  @UseGuards(JwtAuthGuard)
  @Post('user/:userId/interest/:interestId')
  addUserInterest(
    @Param('userId') userId: string,
    @Param('interestId') interestId: string,
    @Body() addUserInterestDto: AddUserInterestDto,
  ) {
    return this.interestsService.addUserInterest(
      userId,
      interestId,
      addUserInterestDto.level,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/:userId/interest/:interestId')
  removeUserInterest(
    @Param('userId') userId: string,
    @Param('interestId') interestId: string,
  ) {
    return this.interestsService.removeUserInterest(userId, interestId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('user/:userId/interest/:interestId')
  updateUserInterestLevel(
    @Param('userId') userId: string,
    @Param('interestId') interestId: string,
    @Body() updateUserInterestDto: UpdateUserInterestDto,
  ) {
    return this.interestsService.updateUserInterestLevel(
      userId,
      interestId,
      updateUserInterestDto.level,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createInterestDto: CreateInterestDto) {
    return this.interestsService.create(createInterestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterestDto: UpdateInterestDto,
  ) {
    return this.interestsService.update(id, updateInterestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interestsService.remove(id);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateInterestDto,
  SimilarUserDto,
  UpdateInterestDto,
  UserInterestDto,
} from './dto';

@Injectable()
export class InterestsService {
  constructor(private prisma: PrismaService) {}

  async findAll(locale: string = 'ru') {
    const interests = await this.prisma.interest.findMany();

    return interests.map((interest) => ({
      id: interest.id,
      code: interest.code,
      category: interest.category,
      emoji: interest.emoji,
      name: locale === 'en' ? interest.en : interest.ru,
    }));
  }

  async findAllByCategory(locale: string = 'ru') {
    const interests = await this.prisma.interest.findMany();

    const categorizedInterests = interests.reduce((acc, interest) => {
      const category = interest.category;

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push({
        id: interest.id,
        code: interest.code,
        emoji: interest.emoji,
        name: locale === 'en' ? interest.en : interest.ru,
      });

      return acc;
    }, {});

    return categorizedInterests;
  }

  async findUserInterests(
    userId: string,
    locale: string = 'ru',
  ): Promise<UserInterestDto[]> {
    const userInterests = await this.prisma.userInterest.findMany({
      where: {
        userId,
      },
      include: {
        interest: true,
      },
    });

    return userInterests.map((ui) => ({
      id: ui.interest.id,
      code: ui.interest.code,
      category: ui.interest.category,
      emoji: ui.interest.emoji,
      name: locale === 'en' ? ui.interest.en : ui.interest.ru,
      level: ui.level,
    }));
  }

  async findUsersByInterest(
    interestId: string,
    limit: number = 10,
    offset: number = 0,
  ) {
    const usersWithInterest = await this.prisma.interest.findUnique({
      where: { id: interestId },
      include: {
        users: {
          skip: offset,
          take: limit,
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                nickname: true,
                gender: true,
              },
            },
          },
        },
      },
    });

    if (!usersWithInterest) {
      return [];
    }

    return usersWithInterest.users.map((ui) => ({
      ...ui.user,
      interestLevel: ui.level,
    }));
  }

  async findSimilarUsers(
    userId: string,
    limit: number = 10,
  ): Promise<SimilarUserDto[]> {
    const userInterests = await this.prisma.userInterest.findMany({
      where: { userId },
      select: { interestId: true },
    });

    const interestIds = userInterests.map((ui) => ui.interestId);

    if (interestIds.length === 0) {
      return [];
    }

    const similarUsers = await this.prisma.userInterest.findMany({
      where: {
        interestId: { in: interestIds },
        userId: { not: userId },
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            nickname: true,
            gender: true,
          },
        },
        interest: true,
      },
      take: limit * 2,
    });

    const userMap: Record<string, SimilarUserDto> = {};
    similarUsers.forEach((ui) => {
      if (!userMap[ui.userId]) {
        userMap[ui.userId] = {
          user: ui.user,
          commonInterests: [],
          count: 0,
        };
      }

      userMap[ui.userId].commonInterests.push({
        id: ui.interest.id,
        code: ui.interest.code,
        category: ui.interest.category,
        name: ui.interest.ru,
        emoji: ui.interest.emoji,
        level: ui.level,
      });

      userMap[ui.userId].count += 1;
    });

    return Object.values(userMap)
      .sort((a: SimilarUserDto, b: SimilarUserDto) => b.count - a.count)
      .slice(0, limit);
  }

  async addUserInterest(userId: string, interestId: string, level: number = 1) {
    return this.prisma.userInterest.create({
      data: {
        userId,
        interestId,
        level,
      },
    });
  }

  async removeUserInterest(userId: string, interestId: string) {
    return this.prisma.userInterest.deleteMany({
      where: {
        userId,
        interestId,
      },
    });
  }

  async updateUserInterestLevel(
    userId: string,
    interestId: string,
    level: number,
  ) {
    return this.prisma.userInterest.updateMany({
      where: {
        userId,
        interestId,
      },
      data: {
        level,
      },
    });
  }

  async create(createInterestDto: CreateInterestDto) {
    return this.prisma.interest.create({
      data: createInterestDto,
    });
  }

  async update(id: string, updateInterestDto: UpdateInterestDto) {
    return this.prisma.interest.update({
      where: { id },
      data: updateInterestDto,
    });
  }

  async remove(id: string) {
    return this.prisma.interest.delete({
      where: { id },
    });
  }
}

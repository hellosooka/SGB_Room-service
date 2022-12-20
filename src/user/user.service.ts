import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  getUserByNickname(nickname: string) {
    return this.prisma.user.findFirst({ where: { nickname } });
  }

  async createUser(dto: CreateUserDto) {
    return await this.prisma.user.create({
      data: { login: dto.login, nickname: dto.nickname, roomId: dto.roomId },
    });
  }
}

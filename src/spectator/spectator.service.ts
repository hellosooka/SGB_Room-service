import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateSpectatorDto } from './dto/create-spectator.dto';

@Injectable()
export class SpectatorService {
  constructor(private prisma: PrismaService) { }

  async createSpectator(dto: CreateSpectatorDto) {
    return await this.prisma.spectator.create({
      data: { login: dto.login, nickname: dto.nickname, roomId: dto.roomId },
    });
  }
}

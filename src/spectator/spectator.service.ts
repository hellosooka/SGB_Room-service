import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
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

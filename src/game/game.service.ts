import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) { }

  getAllGames() {
    return this.prisma.game.findMany();
  }

  async getGameByLink(link: string) {
    const game = await this.prisma.game.findUnique({ where: { link } });
    if (!game) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
    }

    return game;
  }

  createGame(data: Prisma.GameCreateWithoutRoomInput) {
    return this.prisma.game.create({ data });
  }

  async deleteGameByLink(link: string) {
    return await this.prisma.game.delete({ where: { link } });
  }

  async updateGameByLink(link: string, dto: Prisma.GameUpdateInput) {
    return await this.prisma.game.update({ where: { link }, data: { ...dto } });
  }
}

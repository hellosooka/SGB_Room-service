import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GameService } from 'src/game/game.service';
import { PrismaService } from 'src/prisma.service';
import * as uuid from 'uuid';
import { AddUserDto } from './dto/add-user.dto';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(
    private prisma: PrismaService,
    private gameService: GameService,
  ) { }

  getAllRooms() {
    return this.prisma.room.findMany({ include: { users: true } });
  }

  async getRoomById(id: number) {
    const room = await this.prisma.room.findUnique({
      where: { id: `${id}` },
      include: { users: true },
    });

    if (room) {
      return room;
    }
    throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
  }

  async createRoom(dto: CreateRoomDto) {
    const game = await this.gameService.getGameByLink(dto.gameLink);
    const roomCode = this.createRoomCode();
    return await this.prisma.room.create({
      data: {
        users: {
          createMany: {
            data: [{ login: dto.userLogin, nickname: dto.userNickname }],
          },
        },
        game: { connect: { link: game.link } },
        roomCode,
        isStarted: false,
      },
    });
  }

  private createRoomCode() {
    return uuid.v4().slice(0, 5);
  }

  async addUserToRoomById(roomId: number, dto: AddUserDto) {
    const room = await this.getRoomById(roomId);
    const user = await this.prisma.user.create({
      data: { login: dto.login, nickname: dto.nickname, roomId: room.id },
    });

    room.users.push(user);
    return room;
  }
}

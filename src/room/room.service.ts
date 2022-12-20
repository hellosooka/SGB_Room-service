import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GameService } from 'src/game/game.service';
import { SpectatorService } from 'src/spectator/spectator.service';
import { UserService } from 'src/user/user.service';
import * as uuid from 'uuid';
import { AddUserDto } from './dto/add-user.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room, User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(
    private prisma: PrismaService,
    private gameService: GameService,
    private userService: UserService,
    private spectatorService: SpectatorService,
  ) { }

  getAllRooms() {
    return this.prisma.room.findMany({ include: { users: true } });
  }

  async getRoomById(id: number) {
    const room = await this.prisma.room.findUnique({
      where: { id: `${id}` },
      include: { users: true, spectators: true },
    });

    if (room) {
      return room;
    }
    throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
  }

  async getRoomByRoomCode(roomCode: string) {
    return await this.prisma.room.findFirst({ where: { roomCode } });
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

  deleteRoomById(roomId: number) {
    return this.prisma.room.delete({ where: { id: `${roomId}` } });
  }

  async addClientToRoomById(roomId: number, dto: AddUserDto) {
    const room = await this.getRoomById(roomId);
    if (this.checkUserInRoom(dto.nickname, room.users)) {
      throw new HttpException('User is exist', HttpStatus.CONFLICT);
    }

    if (room.isStarted) {
      room.spectators.push(await this.addSpectatorToRoom(roomId, dto));
    } else {
      room.users.push(await this.addUserToRoom(roomId, dto));
    }
    return room;
  }

  private async checkUserInRoom(nickname: string, users: User[]) {
    const user = users.find((user) => user.nickname == nickname);
    if (user) {
      return true;
    }
    return false;
  }

  private async addSpectatorToRoom(roomId: number, dto: AddUserDto) {
    const spectator = await this.spectatorService.createSpectator({
      ...dto,
      roomId: `${roomId}`,
    });
    return spectator;
  }

  private async addUserToRoom(roomId: number, dto: AddUserDto) {
    const user = await this.userService.createUser({
      ...dto,
      roomId: `${roomId}`,
    });
    return user;
  }
}

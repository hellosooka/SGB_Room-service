import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { Prisma } from '@prisma/client';
import { CreateRoomDto } from './dto/create-room.dto';
import { AddUserDto } from './dto/add-user.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Get()
  getAllRooms() {
    return this.roomService.getAllRooms();
  }

  @Get('/:roomId')
  getRoomById(@Param('roomId') roomId: number) {
    return this.roomService.getRoomById(roomId);
  }

  @Delete('/:roomId')
  deleteRoomById(@Param('roomId') roomId: number) { }

  @Post()
  createRoom(@Body() dto: CreateRoomDto) {
    return this.roomService.createRoom(dto);
  }

  @Post('/add-user/:roomId')
  addUserToRoomById(@Param('roomId') roomId: number, @Body() dto: AddUserDto) {
    return this.roomService.addUserToRoomById(roomId, dto);
  }
}

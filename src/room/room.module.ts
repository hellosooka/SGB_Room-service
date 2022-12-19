import { Module } from '@nestjs/common';
import { GameModule } from 'src/game/game.module';
import { PrismaService } from 'src/prisma.service';
import { SpectatorModule } from 'src/spectator/spectator.module';
import { UserModule } from 'src/user/user.module';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [UserModule, SpectatorModule, GameModule],
  controllers: [RoomController],
  providers: [RoomService, PrismaService],
})
export class RoomModule { }

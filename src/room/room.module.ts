import { Module } from '@nestjs/common';
import { GameModule } from 'src/game/game.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SpectatorModule } from 'src/spectator/spectator.module';
import { UserModule } from 'src/user/user.module';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [UserModule, SpectatorModule, GameModule, PrismaModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule { }

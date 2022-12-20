import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SpectatorModule } from './spectator/spectator.module';
import { RoomModule } from './room/room.module';
import { GameModule } from './game/game.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    SpectatorModule,
    RoomModule,
    GameModule,
    ConfigModule.forRoot(),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

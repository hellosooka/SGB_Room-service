import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GameService } from './game.service';
import { GameController } from './game.controller';

@Module({
  providers: [GameService, PrismaService],
  exports: [GameService],
  controllers: [GameController],
})
export class GameModule { }

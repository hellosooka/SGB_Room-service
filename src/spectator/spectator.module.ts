import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SpectatorService } from './spectator.service';

@Module({
  providers: [SpectatorService, PrismaService],
  exports: [SpectatorService],
})
export class SpectatorModule { }

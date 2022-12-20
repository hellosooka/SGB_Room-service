import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SpectatorService } from './spectator.service';

@Module({
  imports: [PrismaModule],
  providers: [SpectatorService],
  exports: [SpectatorService],
})
export class SpectatorModule { }

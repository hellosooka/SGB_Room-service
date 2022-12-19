import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpectatorService {
  constructor(private prisma: PrismaService) { }

  createSpectator(data: Prisma.SpectatorCreateInput) {
    return this.prisma.spectator.create({ data });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  getAllUsers() {
    return this.prisma.user.findMany();
  }
}

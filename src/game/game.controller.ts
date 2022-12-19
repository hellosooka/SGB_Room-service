import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateGameDto } from './dto/create-game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) { }

  @Post()
  createGame(@Body() dto: CreateGameDto) {
    return this.gameService.createGame(dto);
  }

  @Get()
  getAllGames() {
    return this.gameService.getAllGames();
  }

  @Get('/:link')
  getGameByLink(@Param('link') link: string) {
    return this.gameService.getGameByLink(link);
  }
}

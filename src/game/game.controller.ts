import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateGameDto } from './dto/create-game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) { }

  @Get()
  getAllGames() {
    return this.gameService.getAllGames();
  }

  @Post()
  createGame(@Body() dto: CreateGameDto) {
    return this.gameService.createGame(dto);
  }

  @Get('/:link')
  getGameByLink(@Param('link') link: string) {
    return this.gameService.getGameByLink(link);
  }

  @Delete('/:link')
  deleteGameByLink(@Param('link') link: string) { }

  @Put('/:link')
  updateGameByLink(
    @Param('link') link: string,
    @Body() dto: Prisma.GameUpdateInput,
  ) { }
}

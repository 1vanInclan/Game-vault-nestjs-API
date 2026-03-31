import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class GamesService {


  private games: Game[] = [];

  create(newGame: CreateGameDto) {

    const addGame: Game = {
    id: randomUUID(),
    title: newGame.title,
    platform: newGame.platform,
    year: newGame.year,
    status: newGame.status || "PENDING",
  };

    this.games.push(addGame)

    return addGame
  }

  findAll() {
    return this.games
  }

  findOne(id: string) {
    const game = this.games.find( game => game.id === id )

    if(!game) {
      throw new NotFoundException(`Juego con id ${id} no encontrado`)
    }

    return game
  }

  update(id: string, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: string) {
    const gameIndex = this.games.findIndex(game => game.id === id)
    if(gameIndex === -1){
      throw new NotFoundException(`Juego con id ${id} no encontrado`)
    }

    this.games.splice(gameIndex, 1)

    return {Deleted: true}
  }
}

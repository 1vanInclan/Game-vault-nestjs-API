import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {


  constructor(private prisma: PrismaService) {}

  async create(newGame: CreateGameDto) {

    return this.prisma.game.create({
      data: newGame,
    });
  }

  async findAll() {
    return this.prisma.game.findMany()
  }

  async findOne(id: string) {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });
    if (!game) throw new NotFoundException(`Juego con ID ${id} no encontrado`);
    return game;
  }

  async update(id: string, updateGameDto: UpdateGameDto) {

    await this.findOne(id);
    
    return await this.prisma.game.update({
    where: { id },
    data: updateGameDto,

  });

  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.game.delete({
      where: { id },
    });
  }
}

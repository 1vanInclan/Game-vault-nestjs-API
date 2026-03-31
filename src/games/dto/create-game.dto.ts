import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, MinLength } from "class-validator";

export enum GameStatus {
  PENDING = 'PENDING',
  PLAYING = 'PLAYING',
  PLATINUM = 'PLATINUM',
}

export class CreateGameDto {

  @ApiProperty({ description: 'El nombre del juego', example: 'Resident Evil 3' })
  @IsString({ message: 'El título debe ser un texto' })
  @MinLength(1, { message: 'El título no puede estar vacío' })
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  title: string;

  @ApiProperty({ description: 'Plataforma', example: 'Steam Deck' })
  @IsString()
  platform: string;

  @IsInt()
  @Min(1950, { message: 'El año parece demasiado antiguo' })
  @Max(new Date().getFullYear(), { message: 'Aún no vivimos en el futuro, c:' })
  year: number;

  @ApiProperty({ description: 'Año de lanzamiento', example: 2020 })
  @IsEnum(GameStatus, {
    message: 'El estado debe ser: PENDING, PLAYING o PLATINUM',
  })
  @IsOptional() // Si no lo mandan, podemos asignar un default en el service
  status?: GameStatus;

}

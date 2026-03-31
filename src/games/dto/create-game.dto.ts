import { IsEnum, IsInt, IsOptional, IsString, Max, Min, MinLength } from "class-validator";

export enum GameStatus {
  PENDING = 'PENDING',
  PLAYING = 'PLAYING',
  PLATINUM = 'PLATINUM',
}

export class CreateGameDto {

  @IsString()
  @MinLength(1, { message: 'El título no puede estar vacío' })
  title: string;

  @IsString()
  platform: string;

  @IsInt()
  @Min(1950, { message: 'El año parece demasiado antiguo' })
  @Max(new Date().getFullYear(), { message: 'Aún no vivimos en el futuro, c:' })
  year: number;

  @IsEnum(GameStatus, {
    message: 'El estado debe ser: PENDING, PLAYING o PLATINUM',
  })
  @IsOptional() // Si no lo mandan, podemos asignar un default en el service
  status?: GameStatus;

}

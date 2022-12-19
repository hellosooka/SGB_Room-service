import { IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  gameLink: string;

  @IsString()
  userLogin: string;
  @IsString()
  userNickname: string;
}

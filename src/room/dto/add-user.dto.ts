import { IsString } from 'class-validator';

export class AddUserDto {
  @IsString()
  login: string;
  @IsString()
  nickname: string;
}

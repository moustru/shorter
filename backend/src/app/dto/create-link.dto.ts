import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  @Length(16, 2048)
  link: string;
}

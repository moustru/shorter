import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { CreateLinkRdo } from './rdo/create-link.rdo';
import type { Response } from 'express';

@Controller('link')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async generate(@Body() dto: CreateLinkDto): Promise<CreateLinkRdo> {
    return await this.appService.generateLink(dto);
  }

  @Get(':link')
  async redirect(@Param('link') link: string, @Res() res: Response) {
    const relatedLink = await this.appService.getInitialLink(link);

    if (relatedLink) {
      return res.redirect(HttpStatus.FOUND, relatedLink);
    } else {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send('Ссылка не найдена или недействительна');
    }
  }
}

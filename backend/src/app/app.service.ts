import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { RedisService } from 'src/common/redis/redis.service';
import { nanoid } from 'nanoid';
import { CreateLinkRdo } from './rdo/create-link.rdo';
import { LINK_TTL, REDIRECT_PREFIX } from './app.constants';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  async generateLink({ link }: CreateLinkDto): Promise<CreateLinkRdo> {
    const existedLink = await this.redisService.get<string>(link);

    if (existedLink) {
      return {
        link: existedLink,
      };
    }

    const newLink = REDIRECT_PREFIX + nanoid(10);

    // Создаем 2 записи - с ключом оригинального урла и сгенерированного. Это позволит нам искать записи с обеих сторон
    await Promise.all([
      this.redisService.set(link, newLink, LINK_TTL),
      this.redisService.set(newLink, link, LINK_TTL),
    ]);

    return {
      link: newLink,
    };
  }

  async getInitialLink(link: string) {
    const relatedLink = await this.redisService.get<string>(
      REDIRECT_PREFIX + link,
    );

    return relatedLink;
  }
}

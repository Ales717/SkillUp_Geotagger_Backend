import { Injectable } from '@nestjs/common';
import { CreateGuessDto } from './dto/create-guess.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GuessesService {
  constructor(private prisma: PrismaService) { }

  create(createGuessDto: CreateGuessDto) {
    return this.prisma.guess.create({
      data: {
        error_distance: createGuessDto.error_distance,
        latitude: createGuessDto.latitude,
        longitude: createGuessDto.longitude,
        user_id: createGuessDto.user_id,
        location_id: createGuessDto.location_id
      }
    })
  }

  findAllUser(user_id: string) {
    return this.prisma.guess.findMany({ where: { user_id } })
  }

  findAllLocation(location_id: string) {
    return this.prisma.guess.findMany({
      where: { location_id },
      take: 10
    })
  }

}

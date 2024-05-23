import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PeginatedResult } from 'src/interfaces/peginated-result.interface';
import { LocationEntity } from 'src/entities/location.entity';
import prismaRandom from 'prisma-extension-random'
import Logging from 'src/library/Logging';


@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) { }


  create(createLocationDto: CreateLocationDto) {
    return this.prisma.location.create({
      data: {
        image: createLocationDto.image,
        latitude: createLocationDto.latitude,
        longitude: createLocationDto.longitude,
        user_id: createLocationDto.user_id,
      }
    })
  }

  findAll() {
    return this.prisma.location.findMany()
  }

  findAllUser(user_id: string) {
    return this.prisma.location.findMany({ where: { user_id } })
  }

  findOne(id: string) {
    return this.prisma.location.findFirst({ where: { id } })
  }

  update(id: string, updateLocationDto: UpdateLocationDto) {
    return this.prisma.location.update({
      where: { id },
      data: updateLocationDto,
    })
  }


  remove(id: string) {
    return this.prisma.location.delete({ where: { id } })
  }

  async paginate(page = 1, relations: string[] = []): Promise<PeginatedResult> {
    const take = 10
    try {
      const skip = (page - 1) * take;

      const [data, total] = await Promise.all([
        this.prisma.location.findMany({
          take,
          skip,
          include: {
            ...relations.reduce((acc, rel) => ({ ...acc, [rel]: true }), {}),
          },
        }),
        this.prisma.location.count(),
      ]);

      return {
        data,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / take),
        },
      }
    } catch (error) {
      throw new Error(`Something went wrong while paginating locations: ${error}`)
    }
  }

  async updateImage(id: string, image: string) {
    const location = await this.prisma.location.findUnique({ where: { id } })
    if (!location) {
      throw new BadRequestException('Location not found')
    }

    return this.prisma.location.update({
      where: { id },
      data: { image },
    })
  }

}

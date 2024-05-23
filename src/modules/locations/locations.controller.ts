import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, HttpCode, HttpStatus, UploadedFile, BadRequestException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationsService } from './locations.service';
import { ApiTags } from '@nestjs/swagger';
import { PeginatedResult } from 'src/interfaces/peginated-result.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { isFileExtensionSafe, removeFile, saveImageToStorage } from 'src/helpers/imageStorage';
import { LocationEntity } from 'src/entities/location.entity';
import { join } from 'path';
import fs from 'fs';


@Controller('locations')
@ApiTags('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) { }

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto)
  }

  @Get('rand')
  async rand() {
    const locations = await this.locationsService.findAll()
    const count = locations.length

    if (count === 0) {
      return []
    }

    const randomIndex = Math.floor(Math.random() * count)
    const randomLocation = locations[randomIndex]

    return [randomLocation]
  }

  @Get(':page')
  async findAllPage(@Query('page') page: number): Promise<PeginatedResult> {
    return this.locationsService.paginate(page, ['user'])
  }

  @Get()
  findAll() {
    return this.locationsService.findAll()
  }

  @Get('user/:id')
  findAllUser(@Param('id') user_id: string) {
    return this.locationsService.findAllUser(user_id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(id)
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(id, updateLocationDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(id)
  }

  @Post('upload/:id')
  @HttpCode(HttpStatus.CREATED)
  async upload(@Body() fileData: any, @Param('id') itemId: string): Promise<LocationEntity> {
    if (!fileData || !fileData.buffer || !fileData.originalname) {
      throw new BadRequestException('File must be provided')
    }

    const filename = `${Date.now()}-${fileData.originalname}`
    const imagesFolderPath = join(process.cwd(), 'files')
    const fullImagePath = join(imagesFolderPath, filename)

    try {
      await fs.promises.writeFile(fullImagePath, fileData.buffer)

      if (await isFileExtensionSafe(fullImagePath)) {
        return this.locationsService.updateImage(itemId, filename)
      } else {
        await fs.promises.unlink(fullImagePath);
        throw new BadRequestException('File content does not match extension!')
      }
    } catch (error) {
      removeFile(fullImagePath)
      throw new BadRequestException('Error uploading file')
    }
  }
}

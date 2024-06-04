import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, HttpCode, HttpStatus, UploadedFile, BadRequestException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationsService } from './locations.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PeginatedResult } from 'src/interfaces/peginated-result.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { isFileExtensionSafe, removeFile, saveImageToStorage } from 'src/helpers/imageStorage';
import { LocationEntity } from 'src/entities/location.entity';
import { extname, join } from 'path';
import fs from 'fs';
import { diskStorage } from 'multer';
import Logging from 'src/library/Logging';


@Controller('locations')
@ApiTags('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) { }

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    Logging.log('Location controller.')
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

  @Post('/upload/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      }
    })
  }))
  @ApiCreatedResponse({ description: 'File uploaded successfully' })
  @ApiBadRequestResponse({ description: 'Invalid file upload request' })
  async uploadFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const filePath = `/files/${file.filename}`
    await this.locationsService.updateImage(id, filePath)
    return { message: 'File uploaded successfully', fileName: file.filename }
  }
}

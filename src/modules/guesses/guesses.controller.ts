import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GuessesService } from './guesses.service';
import { CreateGuessDto } from './dto/create-guess.dto';
import { ApiTags } from '@nestjs/swagger';


@Controller('guesses')
@ApiTags('guesses')
export class GuessesController {
  constructor(private readonly guessesService: GuessesService) { }

  @Post()
  create(@Body() createGuessDto: CreateGuessDto) {
    return this.guessesService.create(createGuessDto);
  }


  @Get('user/:id')
  findAllUser(@Param('id') user_id: string) {
    return this.guessesService.findAllUser(user_id)
  }

  @Get('location/:id')
  findAllLocation(@Param('id') location_id: string) {
    return this.guessesService.findAllLocation(location_id)
  }

}

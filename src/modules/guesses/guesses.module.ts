import { Module } from '@nestjs/common';
import { GuessesService } from './guesses.service';
import { GuessesController } from './guesses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [GuessesController],
  providers: [GuessesService],
  imports: [PrismaModule],
})
export class GuessesModule { }

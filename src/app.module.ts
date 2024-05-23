import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { LocationsModule } from './modules/locations/locations.module';
import { GuessesModule } from './modules/guesses/guesses.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, LocationsModule, GuessesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

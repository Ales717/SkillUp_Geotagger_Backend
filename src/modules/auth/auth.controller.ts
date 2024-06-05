import { Body, Controller, Post, Res, Get, HttpCode, HttpStatus, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from 'src/entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { Response as ExpressResponse } from 'express'
import { Request as ExpressRequeste } from 'express'
import { UserEntity } from 'src/entities/user.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @ApiOkResponse({ type: UserEntity })
  async login(
    @Body() { email, password }: LoginDto,
    @Res({ passthrough: true }) res: ExpressResponse,
  ): Promise<UserEntity> {
    const user = await this.authService.login(email, password);
    res.cookie('jwt', user.accessToken, { httpOnly: true });
    delete user.accessToken;
    return user;
  }

  @Post('signout')
  async signout(@Res({ passthrough: true }) res: ExpressResponse): Promise<{ msg: string }> {
    res.clearCookie('jwt')
    return { msg: 'ok' }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async user(@Req() req: ExpressRequeste): Promise<UserEntity> {
    const cookie = req.cookies['jwt']
    if (!cookie) {
      throw new UnauthorizedException('JWT token is missing')
    }
    return this.authService.user(cookie)
  }

}

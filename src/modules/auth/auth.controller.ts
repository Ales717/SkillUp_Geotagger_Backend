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
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() { email, password }: LoginDto, @Res({ passthrough: true }) res: ExpressResponse) {
    const accessToken = await this.authService.login(email, password)
    res.cookie('jwt', accessToken, { httpOnly: true })
    return accessToken
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
    const token = cookie.accessToken
    return this.authService.user(token)
  }

}

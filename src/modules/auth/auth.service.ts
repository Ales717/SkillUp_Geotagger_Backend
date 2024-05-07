import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthEntity } from 'src/entities/auth.entity'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { UserEntity } from 'src/entities/user.entity'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async login(email: string, password: string): Promise<AuthEntity> {
        const user = await this.prisma.user.findUnique({ where: { email: email } })
        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`)
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password')
        }
        return {
            accessToken: this.jwtService.sign({ userId: user.id }),
        }
    }


    async user(cookie: string): Promise<UserEntity> {
        const decodedToken = await this.jwtService.verifyAsync(cookie);
        const userId = decodedToken.userId;
        return this.prisma.user.findUnique({ where: { id: userId } })
    }
}

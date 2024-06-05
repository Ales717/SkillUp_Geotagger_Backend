import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthEntity } from 'src/entities/auth.entity'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { UserEntity } from 'src/entities/user.entity'
import Logging from 'src/library/Logging'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async login(email: string, password: string): Promise<AuthEntity> {
        Logging.log('Validating user...')
        const user = await this.prisma.user.findUnique({ where: { email: email } })
        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`)
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password')
        }
        Logging.log('User is valid.')
        const accessToken = this.jwtService.sign({ userId: user.id });
        return { ...user, accessToken }
    }


    async user(token: string): Promise<UserEntity> {
        const decodedToken = await this.jwtService.verifyAsync(token)
        const userId = decodedToken.userId
        const user = await this.prisma.user.findUnique({ where: { id: userId } })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }
}

import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
    @ApiProperty()
    id: string

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date

    @ApiProperty()
    first_name: string

    @ApiProperty()
    last_name: string

    @ApiProperty()
    email: string

    @Exclude()
    password: string

    @ApiProperty()
    points: number

    @ApiProperty()
    role: Role
}

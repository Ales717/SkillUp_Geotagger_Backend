import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

export class AuthEntity extends UserEntity {
    @ApiProperty()
    accessToken: string
}
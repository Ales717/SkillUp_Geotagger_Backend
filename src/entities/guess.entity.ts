import { Guess } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger';

export class GuessEntity implements Guess {
    @ApiProperty()
    id: string

    @ApiProperty()
    image: string

    @ApiProperty()
    latitude: number

    @ApiProperty()
    longitude: number

    @ApiProperty()
    error_distance: number

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date

    @ApiProperty({ required: false, nullable: true })
    user_id: string | null

    @ApiProperty({ required: false, nullable: true })
    location_id: string | null
}


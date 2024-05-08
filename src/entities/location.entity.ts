import { ApiProperty } from '@nestjs/swagger';
import { Location } from '@prisma/client';

export class LocationEntity implements Location {
    @ApiProperty()
    id: string

    @ApiProperty()
    image: string

    @ApiProperty()
    latitude: number

    @ApiProperty()
    longitude: number

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date

    @ApiProperty({ required: false, nullable: true })
    user_id: string | null;
}

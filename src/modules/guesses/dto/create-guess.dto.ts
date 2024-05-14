import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class CreateGuessDto {
    @ApiProperty({ required: false })
    @IsOptional()
    error_distance?: number

    @ApiProperty({ required: false })
    @IsOptional()
    latitude?: number

    @ApiProperty({ required: false })
    @IsOptional()
    longitude?: number

    @ApiProperty({ required: false })
    @IsOptional()
    user_id?: string

    @ApiProperty({ required: false })
    @IsOptional()
    location_id?: string
}

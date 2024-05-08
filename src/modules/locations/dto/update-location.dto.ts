import { PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateLocationDto {
    @ApiProperty({ required: false })
    @IsOptional()
    image?: string

    @ApiProperty({ required: false })
    @IsOptional()
    latitude?: number

    @ApiProperty({ required: false })
    @IsOptional()
    longitude?: number

}

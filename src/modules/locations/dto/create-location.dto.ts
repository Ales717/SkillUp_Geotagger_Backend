import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateLocationDto {
    @ApiProperty({ required: false })
    @IsOptional()
    latitude?: number

    @ApiProperty({ required: false })
    @IsOptional()
    longitude?: number

    @ApiProperty({ required: false })
    @IsOptional()
    user_id?: string
}

import { IsOptional, IsEmail, IsNotEmpty, Matches } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Match } from 'src/decorators/match.decorator'

export class CreateUserDto {
    @ApiProperty({ required: false })
    @IsOptional()
    first_name?: string

    @ApiProperty({ required: false })
    @IsOptional()
    last_name?: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/, {
        message:
            'Password must have at least one number, lower or upper case letter and it has to be longer than 5 characters.',
    })
    password: string

}


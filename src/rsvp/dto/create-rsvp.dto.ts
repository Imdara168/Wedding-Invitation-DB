import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

export class CreateRsvpDto {
  @IsString()
  @MinLength(1)
  @Matches(/\S/, { message: 'name must contain a non-space character' })
  @MaxLength(100)
  name!: string;

  @IsEmail()
  email!: string;

  @IsBoolean()
  attending!: boolean;

  @IsInt()
  @Min(0)
  @Max(5)
  guestCount!: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  message?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description?: string;
}

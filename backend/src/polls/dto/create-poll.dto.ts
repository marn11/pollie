import {
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
  MinLength,
} from 'class-validator';

export class CreatePollDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(8)
  options: string[];
  
  @IsBoolean()
  isAnonymous: boolean;
}

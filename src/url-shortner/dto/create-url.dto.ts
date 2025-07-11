// import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

// export class CreateUrlDto {
//   @IsNotEmpty()
//   @IsUrl()
//   originalUrl: string;

//   @IsOptional()
//   @IsString()
//   shortCode?: string;
// }

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    example: 'https://example.com/some-long-url',
    description: 'The original URL to be shortened',
  })
  @IsUrl()
  originalUrl: string;

  @ApiProperty({
    example: 'mycustomcode',
    required: false,
    description: 'Optional custom short code',
  })
  @IsOptional()
  @IsString()
  shortCode?: string;
}

import { ApiProperty } from '@nestjs/swagger';
export class UpdatePostDTO {
  @ApiProperty({ required: false })
  title: string;

  @ApiProperty({ required: false })
  text: string;
}

import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { ApiProperty } from '@nestjs/swagger';

const CreatePostSchema = z.object({
  title: z.string(),
  text: z.string(),
});

export class CreatePostDTO extends createZodDto(CreatePostSchema) {
  /** Post title */
  @ApiProperty()
  title: string;

  /** Post content */
  @ApiProperty()
  text: string;
}

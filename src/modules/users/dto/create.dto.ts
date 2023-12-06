import { IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegexHelper } from '@/common/utils/regex.util';
export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(RegexHelper.password, {
    message:
      'Password must contain lowercase and uppercase letters, numbers, special characters and minimun length of 8.',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;
}

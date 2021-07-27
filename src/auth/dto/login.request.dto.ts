import { PickType } from '@nestjs/swagger';
import { Cat } from 'schemas/cat.schema';

export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}

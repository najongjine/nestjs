import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../../../schemas/cat.schema';

/** response로 보낼때 사용하는 dto */
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  // schema에선 정의하지 않았지만 monoose가 자동으로 주는 필드
  @ApiProperty({
    example: '3280199',
    description: 'id',
  })
  id: string;
}

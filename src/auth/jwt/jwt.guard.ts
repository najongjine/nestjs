import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** guard 에서 strategy가 자동으로 실행
 * 정확히 말하면 컨트롤러에서 @useguard(JwtAuthGuard) 이런식으로 사용
 *
 * JwtAuthGuard를 발동시키면 jwt.strategy 안에있는 validate 함수가 발동된다
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

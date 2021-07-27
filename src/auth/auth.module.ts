import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CatsModule } from 'src/cats/cats.module';
import { CatsRepository } from 'src/cats/cats.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // guard에서 사용할수 있도록 설정해주기
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),

    /** jwt를 만들어주는 모듈. jwt 모듈자체에서 export 시킨것들을 사용하게 해주는 코드 */
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),

    // cats module에서 export 시킨것들을 사용가능하게 해주기
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

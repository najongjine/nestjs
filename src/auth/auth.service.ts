import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    // authModule 에 있는 JwtModule 에서 제공해주는 공급자
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    //* 해당하는 email이 있는지
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    //* password가 일치한지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    /** 내가 자유롭게 토큰의 내용을 정의하는 json 객체. sub 은 토큰제목으로 사용하기로 함 */
    const payload = { email: email, sub: cat.id };

    return {
      // 토큰 만들기
      token: this.jwtService.sign(payload),
    };
  }
}

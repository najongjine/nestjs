import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Cat } from 'schemas/cat.schema';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { multerOptions } from 'src/common/utils/multer.options';
import { CatsService } from '../service/cats.service';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { CatRequestDto } from '../dto/cats.request.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  // dependency injection을 하려면 해당하는 모듈을 import 해야한다
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiBearerAuth() // swagger 문서에 좌물쇠 그림 그려줌
  @ApiOperation({ summary: '현재 고양이 가져오기' })
  /** guard를 만나게되면 여기서 인증처리를 해준다 */
  @UseGuards(JwtAuthGuard)
  @Get()
  // custom decorator. request.user 를 리턴해주는 기능이 구현되있다
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat.readOnlyData;
  }

  @ApiOperation({ summary: '모든 고양이 가져오기' })
  @Get('all')
  getAllCat() {
    return this.catsService.getAllCat();
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: 'registration' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    console.log(`## ${body.name},${body.email},${body.password}`);
    return await this.catsService.signUp(body); // 소비자가 제품을 사용한다
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  // upload를 하면 dist폴더(컴파일된 자바스크립트 폴더 안) 경로에 파일이 저장된다
  @ApiOperation({ summary: '고양이 이미지 업로드' })
  // 파일의 key == image, 최대 10, cats 폴더안에
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImg(
    /** multipart 를 받에 해주는 decorator */
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    console.log(files);

    // return 'uploadImg';
    // return { image: `http://localhost:8000/media/cats/${files[0].filename}` };
    return this.catsService.uploadImg(cat, files);
  }
}

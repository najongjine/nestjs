import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Cat, CatSchema } from 'schemas/cat.schema';
import { AuthModule } from 'src/auth/auth.module';
import { CatsController } from './controller/cats.controller';
import { CatsRepository } from './cats.repository';
import { CatsService } from './service/cats.service';

@Module({
  /** cat module에 해당 스키마를 등록후 사용 가능하게 해줌 */
  imports: [
    MulterModule.register({
      dest: './upload', // 기본적으로 업로드라는 폴더에 저장이 된다
    }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  // 다른곳에서 사용할수 있도록 export 시키기
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}

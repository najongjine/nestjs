import {
  Controller,
  Get,
  HttpException,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';

@UseInterceptors(SuccessInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // ## __dirname: H:\MyProjects\NestJs\teaching_nestjs\testnest\dist\src
    console.log(`## __dirname: ${__dirname}`);
    //throw new HttpException('error test', 200);
    return this.appService.getHello();
  }
}

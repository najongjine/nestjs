import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// createParamDecorator == custom decorator 만드는 기능을 제공하는 모듈 내장함수
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

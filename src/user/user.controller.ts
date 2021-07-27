import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { createConnection } from 'typeorm';
import { TUser } from '../entities/TUser';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('get_all')
  getAll() {
    try { 
        await createConnection(); // typeORM db connection 
        console.log('typeORM DB 커넥션 생성됨'); //SQL : selct * from User 
        const users = await TUser.find(); 
        console.log(users); //SQL : select * from User where User.email = 'gogogo@gmail.com' const userFound = await User.findOne({email: "gogogo@gmail.com"}); console.log(userFound); return 'done'; } catch (err) { console.log(err); }

    //return this.userService.getHello();
  }
}

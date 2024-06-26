import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './service/user.service';
import { Handler } from './utils/handler';

interface UserRequest extends Request {
  user: any;
}
@Injectable()
export class isAuthenticated implements NestMiddleware {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly sucesHandle: Handler,
  ) {}
  async use(req: UserRequest, res: Response, next: NextFunction) {
    console.log('xxx')
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await this.jwt.verify(token);
        const user = await this.userService.getOne(decoded.mobileNo);
        if (user) {
          req.user = user;
          next();
        } else {
          return this.sucesHandle.errorException(res, 'Access denied');
        }
      } else {
        return this.sucesHandle.errorException(res, 'No token found');
      }
    } catch {
      return this.sucesHandle.errorException(res, 'No token found');
    }
  }
}

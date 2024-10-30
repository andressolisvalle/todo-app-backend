import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service'; 
import { User } from '../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET, 
      });
    }
  
    async validate(payload: { username: string; sub: number }): Promise<User> {
      return this.usersService.findOne(payload.username);
    }
  }
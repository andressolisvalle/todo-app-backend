import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service'; 
import { User } from '../users/user.entity';
import { config } from 'dotenv';
config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET, 
      });
    }
  
    async validate(payload: { username: string; sub: number }): Promise<User> {
        console.log(payload);
        const user = await this.usersService.findOne(payload.username);
        
        if (!user) {
           throw new UnauthorizedException();
        }
        console.log("este es el usuario logeado "+user.username);
        return user;
     }
     
  }
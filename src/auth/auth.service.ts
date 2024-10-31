import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/create-user.dto';
import { User } from 'src/users/user.entity';
import { LoginDto } from './login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService, 
      ) {}

      async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.usersService.findOne(username);
        
        if (user && (await bcrypt.compare(password, user.password))) {
          return user;
        }
        return null;
      }
    
      async login(username: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.validateUser(username, password);
        if (!user) {
          throw new UnauthorizedException();
        }
    
        const payload = { username: user.username, sub: user.id };
        return {
          accessToken: this.jwtService.sign(payload), 
        };
      }
}
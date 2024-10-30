import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto'; 
import { CreateUserDto } from 'src/users/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

 
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }): Promise<{ accessToken: string }> {
    return this.authService.login(body.username, body.password);
  }
}
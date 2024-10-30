import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto'; // Asegúrate de tener este DTO para la creación de usuarios
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User | undefined> {
    return this.usersService.findById(id);
  }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log('entro al post');
    return this.usersService.create(createUserDto);
  }

//   
//   @Put(':id')
//   async updateUser(
//     @Param('id') id: number,
//     @Body() updateUserDto: UpdateUserDto,
//   ): Promise<User | undefined> {
//     // Aquí podrías implementar un método en el UsersService para actualizar el usuario
//     return this.usersService.update(id, updateUserDto);
//   }

//  // Ruta para eliminar un usuario por ID
//   @Delete(':id')
//   async deleteUser(@Param('id') id: number): Promise<void> {
//     return this.usersService.delete(id);
//   }
}

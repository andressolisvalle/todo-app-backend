import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>, 
    ) {}
  
    async create(createUserDto: CreateUserDto): Promise<User| string> {

      const existingUser = await this.usersRepository.findOne({ where: { username: createUserDto.username } }); 
      if (existingUser) {
         return ('El usuario ya existe');
      }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10); 
        const user = this.usersRepository.create({ ...createUserDto, password: hashedPassword }); 
        return this.usersRepository.save(user);
    }
  
    async findOne(username: string): Promise<User | undefined> {
      return this.usersRepository.findOne({ where: { username } });
    }
  
    async findById(id: number): Promise<User | undefined> {
      return this.usersRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<User[]> {
      return this.usersRepository.find(); 
    }
  }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from 'src/users/user.entity'; 
import { CreateTaskDto } from './create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.tasksRepository.create({ ...createTaskDto, user });
    console.log(task);
    await this.tasksRepository.save(task);
    return task;
  }

  async getTasks(user: User): Promise<Task[]> {   
    return await this.tasksRepository.find({ where: { user } });
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id, user } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTask(id: number, updateTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    Object.assign(task, updateTaskDto); 
    return this.tasksRepository.save(task);
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}

import { Controller, Post, UseGuards,Request, Body, Get, Param, Put, Delete  } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './task.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.createTask(createTaskDto, req.user);
  }

  @Get()
  getAll(@Request() req) {
    return this.tasksService.getTasks(req.user);
  }

   @Get(':id')
   async getTaskById(@Param('id') id: number, @Request() req): Promise<Task> {
     return this.tasksService.getTaskById(id, req.user);
   }
 
   @Put(':id')
   async updateTask(@Param('id') id: number, @Body() updateTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
     return this.tasksService.updateTask(id, updateTaskDto, req.user);
   }
 
   @Delete(':id')
   async deleteTask(@Param('id') id: number, @Request() req): Promise<void> {
     return this.tasksService.deleteTask(id, req.user);
   }
}
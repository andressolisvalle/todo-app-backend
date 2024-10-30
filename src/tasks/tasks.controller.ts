import { Controller, Post, UseGuards,Request, Body, Get  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.createTask(createTaskDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.tasksService.getTasks(req.user);
  }
}
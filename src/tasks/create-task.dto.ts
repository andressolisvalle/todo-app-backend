import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from './task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsEnum(['pendiente', 'en progreso', 'completada'])
  status: TaskStatus;

  @IsOptional()
  dueDate?: Date;
}

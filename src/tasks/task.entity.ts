import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity'; // Asegúrate de que la ruta sea correcta

export enum TaskStatus {
  PENDING = 'pendiente',
  IN_PROGRESS = 'en progreso',
  COMPLETED = 'completada',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: ['pendiente', 'en progreso', 'completada'], default: 'pendiente' })
  status: TaskStatus;

  @Column({ type: 'date', nullable: true })
  dueDate?: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}

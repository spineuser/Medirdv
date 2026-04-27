import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  doctor: User;

  @Column()
  dayOfWeek: number; // 0-6

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column({ default: true })
  isAvailable: boolean;
}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  SECRETARY = 'secretary',
  ADMIN = 'admin',
  DIRECTOR = 'director',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  password: string;

  @Column({ default: 'patient' })
role: 'patient' | 'doctor' | 'admin';
}
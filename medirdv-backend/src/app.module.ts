import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
  UsersModule,
  AuthModule,
  AppointmentsModule,
  TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'medirdv_user',
  password: '1234',
  database: 'medirdv',
  autoLoadEntities: true,
  synchronize: true,
})
  ],
})
export class AppModule {}


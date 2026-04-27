import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notifications.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
})
export class NotificationsModule {}
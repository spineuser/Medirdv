import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const adminEmail = 'admin@medirdv.io';
  const adminPassword = 'admin123';
  
  const existing = await usersService.findByEmail(adminEmail);
  
  if (!existing) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await usersService.create({
      fullName: 'Administrator',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin' as any,
    });
    console.log('Seed: Admin user created.');
  } else {
    console.log('Seed: Admin user already exists.');
  }

  await app.close();
}

bootstrap();

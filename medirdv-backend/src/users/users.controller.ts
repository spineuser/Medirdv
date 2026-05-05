import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';


import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() createUserDto: Partial<User>) {
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    }
    // Default to doctor if created via admin dashboard
    if (!createUserDto.role) {
      createUserDto.role = 'doctor' as any;
    }
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles('admin','doctor')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('doctors')
findDoctors() {
  return this.usersService.findDoctors();
}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  //@Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateUserDto: Partial<User>) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  //@Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

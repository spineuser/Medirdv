import { Controller, Post, Get, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Param, Patch } from '@nestjs/common';

@Controller('appointments')
export class AppointmentsController {
  constructor(private service: AppointmentsService) {}

  @Patch(':id/status')
updateStatus(
  @Param('id') id: number,
  @Body() body: { status: string },
) {
  return this.service.updateStatus(id, body.status);
}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private repo: Repository<Appointment>,
  ) {}

  create(data: any) {
  if (!data?.doctorId || !data?.patientId || !data?.date) {
    throw new Error("Missing required fields");
  }

  const appointment = this.repo.create({
    patient: { id: Number(data.patientId) },
    doctor: { id: Number(data.doctorId) },
    date: new Date(data.date),
    reason: data.reason || "",
    status: "pending",
  });

  return this.repo.save(appointment);
}


  updateStatus(id: number, status: string) {
    return this.repo.update(id, { status });
  }

  findAll() {
    return this.repo.find({
      relations: ['patient', 'doctor'],
    });
  }


  findByPatient(patientId: number) {
    return this.repo.find({
      where: { patient: { id: patientId } },
      relations: ['doctor'],
    });
  }

 
  findByDoctor(doctorId: number) {
    return this.repo.find({
      where: { doctor: { id: doctorId } },
      relations: ['patient'],
    });
  }
}
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class FakeAppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointments = this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    );
    return findAppointments;
  }
}

export default FakeAppointmentRepository;

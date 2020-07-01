import AppError from '@shared/errors/AppError';
import FakeAppointmetsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
  it('should be able to created a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmetsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123456213456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456213456');
  });

  it('should not be able to create to appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmetsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date();

    const appointment = await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '1',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '1',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

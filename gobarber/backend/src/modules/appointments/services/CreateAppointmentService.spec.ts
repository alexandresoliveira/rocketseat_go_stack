import AppError from '@shared/errors/AppError';
import FakeAppointmetsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmetsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmetsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to created a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123456213456',
      user_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456213456');
  });

  it('should not be able to create to appointment on the same time', async () => {
    const appointmentDate = new Date();

    const appointment = await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '1',
      user_id: '123123',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '1',
        user_id: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

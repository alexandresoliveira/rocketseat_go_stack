import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import authMiddleware from '../middlewares/ensureAuthenticated';

import AppointmentRepository from '../repositories/AppointmentRepository';

import CreateAppointmentService from '../services/appointments/CreateAppointmentService';

const appointmentsRoutes = Router();
const createAppointmentService = new CreateAppointmentService();

appointmentsRoutes.use(authMiddleware);

appointmentsRoutes.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();
  return response.json(appointments);
});

appointmentsRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRoutes;

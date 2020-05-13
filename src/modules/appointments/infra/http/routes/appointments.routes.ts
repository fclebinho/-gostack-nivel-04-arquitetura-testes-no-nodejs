import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '@modules/appointments/infra/repositories/appointment-repository';
import AppointmentCreateService from '@modules/appointments/services/appointment-create-service';

import authenticated from '@modules/users/infra/http/middlewares/authenticate';

export const appointmentsRouter = Router();
const repository = new AppointmentRepository();

appointmentsRouter.use(authenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await repository.find();
//
//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);
  const service = new AppointmentCreateService(repository);
  const appointment = await service.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;

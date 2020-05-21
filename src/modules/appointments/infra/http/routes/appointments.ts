import { Router } from 'express';

import authenticated from '@modules/users/infra/http/middlewares/authenticate';
import {
  AppointmentsController,
  ProviderAppointmentsController,
} from '@modules/appointments/infra/http/controllers';

export const appointmentsRouter = Router();
const controller = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(authenticated);

appointmentsRouter.post('/', controller.create);

appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;

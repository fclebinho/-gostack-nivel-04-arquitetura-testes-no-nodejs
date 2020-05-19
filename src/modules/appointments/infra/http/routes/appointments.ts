import { Router } from 'express';

import authenticated from '@modules/users/infra/http/middlewares/authenticate';
import { AppointmentsController } from '@modules/appointments/infra/http/controllers';

export const appointmentsRouter = Router();
const controller = new AppointmentsController();

appointmentsRouter.use(authenticated);

appointmentsRouter.post('/', controller.create);

export default appointmentsRouter;

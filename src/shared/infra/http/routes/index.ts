import { Router } from 'express';

import {
  UsersRoutes,
  SessionsRoutes,
  PasswordRoutes,
} from '@modules/users/infra/http/routes';
import { AppointmentsRoutes } from '@modules/appointments/infra/http/routes';

export const routes = Router();

routes.use('/users', UsersRoutes);
routes.use('/sessions', SessionsRoutes);
routes.use('/appointments', AppointmentsRoutes);
routes.use('/password', PasswordRoutes);

export default routes;

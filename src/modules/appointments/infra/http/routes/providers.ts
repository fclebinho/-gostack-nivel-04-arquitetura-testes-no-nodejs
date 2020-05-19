import { Router } from 'express';

import authenticated from '@modules/users/infra/http/middlewares/authenticate';
import { ProvidersController } from '@modules/appointments/infra/http/controllers';

export const providersRouter = Router();
const controller = new ProvidersController();

providersRouter.use(authenticated);

providersRouter.get('/', controller.get);

export default providersRouter;

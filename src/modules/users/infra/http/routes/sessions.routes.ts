import { Router } from 'express';

import { SessionsController } from '@modules/users/infra/http/controllers';

export const sessionsRouter = Router();
const controller = new SessionsController();

sessionsRouter.post('/', controller.create);

export default sessionsRouter;

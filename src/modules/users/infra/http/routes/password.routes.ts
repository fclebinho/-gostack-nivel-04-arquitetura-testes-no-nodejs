import { Router } from 'express';

import {
  ResetPasswordController,
  RetrievePasswordController,
} from '@modules/users/infra/http/controllers';

const passwordRouter = Router();
const resetController = new ResetPasswordController();
const retrieveController = new RetrievePasswordController();

passwordRouter.post('/reset', resetController.create);
passwordRouter.post('/retrieve', retrieveController.create);

export default passwordRouter;

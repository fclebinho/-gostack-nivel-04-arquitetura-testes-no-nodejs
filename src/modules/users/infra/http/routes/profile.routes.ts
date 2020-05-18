import { Router } from 'express';
import multer from 'multer';

import { authenticated } from '@modules/users/infra/http/middlewares/authenticate';
import { UpdateProfileController } from '@modules/users/infra/http/controllers';

export const profileRouter = Router();
const profileController = new UpdateProfileController();

profileRouter.use(authenticated);
profileRouter.put('/', profileController.update);

export default profileRouter;

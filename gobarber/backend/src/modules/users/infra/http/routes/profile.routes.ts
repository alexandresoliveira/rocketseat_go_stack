import { Router } from 'express';

import authMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.use(authMiddleware);

profileRoutes.get('/', profileController.show);
profileRoutes.put('/', profileController.update);

export default profileRoutes;

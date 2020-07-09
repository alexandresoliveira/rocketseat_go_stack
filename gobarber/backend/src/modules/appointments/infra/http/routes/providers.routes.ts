import { Router } from 'express';

import authMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

const providersRoutes = Router();
const providersController = new ProvidersController();

providersRoutes.use(authMiddleware);

providersRoutes.get('/', providersController.index);

export default providersRoutes;

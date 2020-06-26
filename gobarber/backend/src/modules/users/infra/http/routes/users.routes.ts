import { Router } from 'express';
import multer from 'multer';

import authMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

const usersRoutes = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post('/', usersController.create);

usersRoutes.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  userAvatarController.update
);

export default usersRoutes;

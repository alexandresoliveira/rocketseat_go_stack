import { Router } from 'express';
import multer from 'multer';

import authMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UploadUserAvatarService from '@modules/users/services/UploadUserAvatarService';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) => {
  const createUserService = new CreateUserService();
  const user = await createUserService.execute(request.body);
  delete user.password;
  return response.json(user);
});

usersRoutes.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  async (request, response) => {
    const uploadUserAvatarService = new UploadUserAvatarService();
    const user = await uploadUserAvatarService.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });
    return response.json(user);
  }
);

export default usersRoutes;

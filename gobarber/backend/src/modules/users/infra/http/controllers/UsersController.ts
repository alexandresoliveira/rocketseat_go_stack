import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UploadUserAvatarService from '@modules/users/services/UploadUserAvatarService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute(request.body);
    delete user.password;
    return response.json(user);
  }
}

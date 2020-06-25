import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class AuthenticateUserService {
  async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Email or password are incorrect!');
    }

    const correctPassword = await compare(password, user.password);

    if (!correctPassword) {
      throw new AppError('Email or password are incorrect!');
    }

    const token = sign({}, 'f4e0538bbf073a6b79d0dca2f0e9751e', {
      expiresIn: '1d',
      subject: user.id,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;

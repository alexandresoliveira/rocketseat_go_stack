import { compareSync } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
  it('should be able to created a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUserService.execute({
      name: 'Teste',
      email: 'teste@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Teste');
    expect(user.email).toBe('teste@email.com');
  });

  it('should not be able to create to user on the same time', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUserService.execute({
      name: 'Teste',
      email: 'teste@email.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'Teste',
        email: 'teste@email.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

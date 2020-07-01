import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUserService', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUserService.execute({
      name: 'Teste',
      email: 'teste@email.com',
      password: '123456',
    });

    const user = await authenticateUserService.execute({
      email: 'teste@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('user');
    expect(user).toHaveProperty('token');
  });

  it('should not be able to authenticate with incorrect credentials', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authenticateUserService.execute({
        email: 'teste2@email.com',
        password: '1234563',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUserService.execute({
      name: 'Teste',
      email: 'teste@email.com',
      password: '123456',
    });

    expect(
      authenticateUserService.execute({
        email: 'teste2@email.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUserService.execute({
      name: 'Teste',
      email: 'teste@email.com',
      password: '123456',
    });

    expect(
      authenticateUserService.execute({
        email: 'teste@email.com',
        password: '1234565',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

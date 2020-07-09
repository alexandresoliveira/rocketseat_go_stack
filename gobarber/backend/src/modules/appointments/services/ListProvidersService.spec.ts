import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const exceptUser = await fakeUsersRepository.create({
      name: 'Teste1',
      email: 'teste1@email.com',
      password: '123456',
    });

    const provider1 = await fakeUsersRepository.create({
      name: 'Teste2',
      email: 'teste2@email.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: exceptUser.id,
    });

    expect(providers.length).toBe(1);
    expect(providers).toEqual([provider1]);
  });
});

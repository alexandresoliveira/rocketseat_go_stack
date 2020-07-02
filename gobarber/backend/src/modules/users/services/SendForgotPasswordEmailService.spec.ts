import { compareSync } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmailService', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

    const sendMailFunc = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = await sendForgotPasswordEmailService.execute({
      email: 'teste@email.com',
    });

    expect(sendMailFunc).toHaveBeenCalled();
  });
});

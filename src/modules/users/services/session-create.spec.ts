import 'reflect-metadata';

import { HashProviderFake } from '@modules/users/providers';
import {
  SessionCreateService,
  UserCreateService,
} from '@modules/users/services';
import { UsersRepositoryFake } from '@modules/users/repositories';

import { ApplicationError } from '@shared/errors/application-error';

describe('SessionCreate', () => {
  it('should be able to authenticate', async () => {
    const hash = new HashProviderFake();
    const repository = new UsersRepositoryFake();
    const service = new SessionCreateService(repository, hash);

    const userService = new UserCreateService(repository, hash);

    await userService.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const response = await service.execute({
      email: 'johndoe@mail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate when user not exists', async () => {
    const hash = new HashProviderFake();
    const repository = new UsersRepositoryFake();
    const service = new SessionCreateService(repository, hash);

    const userService = new UserCreateService(repository, hash);

    await userService.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      service.execute({
        email: 'invalid@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const hash = new HashProviderFake();
    const repository = new UsersRepositoryFake();
    const service = new SessionCreateService(repository, hash);

    const userService = new UserCreateService(repository, hash);

    await userService.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      service.execute({
        email: 'johndoe@mail.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});

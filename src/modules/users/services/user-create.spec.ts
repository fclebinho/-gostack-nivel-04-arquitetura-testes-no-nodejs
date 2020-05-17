import 'reflect-metadata';

import { HashProviderFake } from '@modules/users/providers';
import { UserCreateService } from '@modules/users/services';
import { UsersRepositoryFake } from '@modules/users/repositories';

import { ApplicationError } from '@shared/errors/application-error';

describe('UserCreate', () => {
  it('should be able to create a new user', async () => {
    const hash = new HashProviderFake();
    const repository = new UsersRepositoryFake();
    const service = new UserCreateService(repository, hash);

    const user = await service.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user on then same email', async () => {
    const hash = new HashProviderFake();
    const repository = new UsersRepositoryFake();
    const service = new UserCreateService(repository, hash);

    await service.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123123',
    });

    await expect(
      service.execute({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});

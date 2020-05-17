import 'reflect-metadata';

import { StorageFakeProvider } from '@shared/providers';
import { UsersRepositoryFake } from '@modules/users/repositories';
import { UserAvatarUpdateService } from '@modules/users/services';

import { ApplicationError } from '@shared/errors/application-error';

describe('UserAvatarUpdate', () => {
  it('should be able to update avatar', async () => {
    const repository = new UsersRepositoryFake();
    const storage = new StorageFakeProvider();
    const service = new UserAvatarUpdateService(repository, storage);

    const user = await repository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await service.execute({
      user_id: user.id,
      avatar_file_name: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should be able to update avatar when non exists user', async () => {
    const repository = new UsersRepositoryFake();
    const storage = new StorageFakeProvider();
    const service = new UserAvatarUpdateService(repository, storage);

    await expect(
      service.execute({
        user_id: 'non-existing-user',
        avatar_file_name: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('should delete old avatar when updating new one', async () => {
    const repository = new UsersRepositoryFake();
    const storage = new StorageFakeProvider();
    const service = new UserAvatarUpdateService(repository, storage);

    const deleteFile = jest.spyOn(storage, 'delete');

    const user = await repository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await service.execute({
      user_id: user.id,
      avatar_file_name: 'avatar.jpg',
    });

    await service.execute({
      user_id: user.id,
      avatar_file_name: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});

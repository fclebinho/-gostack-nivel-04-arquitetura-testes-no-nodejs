import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DiskStorageProvider } from '@shared/providers/storage';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories';
import { UserAvatarUpdateService } from '@modules/users/services';

export default class AvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const storageProvider = container.resolve(DiskStorageProvider);
    const usersRepository = container.resolve(UsersRepository);
    const service = new UserAvatarUpdateService(
      usersRepository,
      storageProvider,
    );

    const user = await service.execute({
      user_id: request.user.id,
      avatar_file_name: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}

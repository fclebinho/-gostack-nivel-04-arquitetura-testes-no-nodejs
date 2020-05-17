import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/users-repository';
import { UserAvatarUpdateService } from '@modules/users/services';

export default class AvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const repository = container.resolve(UsersRepository);
    const service = new UserAvatarUpdateService(repository);

    const user = await service.execute({
      user_id: request.user.id,
      avatar_file_name: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}

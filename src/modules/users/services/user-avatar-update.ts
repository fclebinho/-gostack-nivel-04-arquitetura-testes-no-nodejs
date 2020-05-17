import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/users-repository';
import { ApplicationError } from '@shared/errors/application-error';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/user';

interface IUserRequest {
  user_id: string;
  avatar_file_name: string;
}

@injectable()
class UserAvatarUpdate {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    avatar_file_name,
  }: IUserRequest): Promise<User> {
    const user = await this.repository.findById(user_id);

    if (!user) {
      throw new ApplicationError('Only authenticated users can change avatar.');
    }

    if (user.avatar) {
      const filePath = path.join(uploadConfig.directory, user.avatar);
      const exists = await fs.promises.stat(filePath);

      if (exists) {
        await fs.promises.unlink(filePath);
      }
    }

    user.avatar = avatar_file_name;
    await this.repository.save(user);

    return user;
  }
}

export default UserAvatarUpdate;

import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/users-repository';
import { ApplicationError } from '@shared/errors/application-error';
import User from '@modules/users/infra/typeorm/entities/user';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class UserCreate {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IUserRequest): Promise<User> {
    const checkUserExists = await this.repository.findByEmail(email);

    if (checkUserExists) {
      throw new ApplicationError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default UserCreate;

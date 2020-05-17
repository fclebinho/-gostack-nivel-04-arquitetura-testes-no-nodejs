import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@modules/users/providers';
import { IUsersRepository } from '@modules/users/repositories';
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
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IUserRequest): Promise<User> {
    const checkUserExists = await this.repository.findByEmail(email);

    if (checkUserExists) {
      throw new ApplicationError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generate(password);

    const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default UserCreate;

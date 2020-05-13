import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { ApplicationError } from '../../../shared/errors/application-error';
import User from '../infra/typeorm/entities/user';

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export class UserCreateService {
  public async execute({ name, email, password }: UserRequest): Promise<User> {
    const repository = getRepository(User);

    const checkUserExists = await repository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new ApplicationError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = repository.create({ name, email, password: hashedPassword });
    await repository.save(user);

    return user;
  }
}

export default UserCreateService;

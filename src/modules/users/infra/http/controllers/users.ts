import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/users-repository';
import { UserCreateService } from '@modules/users/services';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const repository = container.resolve(UsersRepository);
    const service = new UserCreateService(repository);
    const user = await service.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }
}

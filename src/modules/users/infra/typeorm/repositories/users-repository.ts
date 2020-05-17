import { EntityRepository, Repository, getRepository } from 'typeorm';

import { IUserCreateDTO } from '@modules/users/dtos/user-create';
import { IUsersRepository } from '@modules/users/repositories';
import User from '@modules/users/infra/typeorm/entities/user';

@EntityRepository(User)
export class UsersRepository implements IUsersRepository {
  private orm: Repository<User>;

  constructor() {
    this.orm = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.orm.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.orm.findOne({
      where: { email },
    });

    return user;
  }

  public async create(data: IUserCreateDTO): Promise<User> {
    const user = this.orm.create(data);
    this.orm.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.orm.save(user);
  }
}

export default UsersRepository;

import { uuid } from 'uuidv4';

import { IUserCreateDTO } from '@modules/users/dtos/user-create';
import { IUsersRepository } from '@modules/users/repositories';

import User from '@modules/users/infra/typeorm/entities/user';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async create(data: IUserCreateDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, data);
    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex(find => find.id === user.id);

    this.users[index] = user;

    return user;
  }
}

export default UsersRepository;

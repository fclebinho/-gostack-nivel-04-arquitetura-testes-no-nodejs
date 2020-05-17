import User from '@modules/users/infra/typeorm/entities/user';
import { IUserCreateDTO } from '@modules/users/dtos/user-create';

export interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: IUserCreateDTO): Promise<User>;
  save(user: User): Promise<User>;
}

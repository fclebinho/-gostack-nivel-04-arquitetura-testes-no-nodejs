import { uuid } from 'uuidv4';

import { IUserTokensRepository } from '@modules/users/repositories';
import UserTokens from '@modules/users/infra/typeorm/entities/user-token';

class UserTokensRepository implements IUserTokensRepository {
  private userTokens: UserTokens[] = [];

  public async generate(user_id: string): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default UserTokensRepository;

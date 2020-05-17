import UserTokens from '@modules/users/infra/typeorm/entities/user-token';

export default interface IUserTokens {
  generate(user_id: string): Promise<UserTokens>;
}

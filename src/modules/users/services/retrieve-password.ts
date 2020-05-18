import { injectable, inject } from 'tsyringe';

import { IMailProvider } from '@shared/providers';
import {
  IUsersRepository,
  IUserTokensRepository,
} from '@modules/users/repositories';
import ApplicationError from '@shared/errors/application-error';

interface IRequest {
  email: string;
}

@injectable()
class RetrievePassword {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new ApplicationError('User not exists');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.send(
      email,
      `Pedido de recuperação de senha recebido: ${token}`,
    );
  }
}

export default RetrievePassword;

import { IMailProvider } from '@shared/providers';

class SendMailProvider implements IMailProvider {
  public async send(to: string, body: string): Promise<void> {
    throw new Error('Not implementation');
  }
}

export default SendMailProvider;

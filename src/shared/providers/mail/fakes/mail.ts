import { IMailProvider } from '@shared/providers';

interface IMessage {
  to: string;
  body: string;
}

class Mail implements IMailProvider {
  private messages: IMessage[] = [];

  public async send(to: string, body: string): Promise<void> {
    this.messages.push({
      to,
      body,
    });
  }
}

export default Mail;

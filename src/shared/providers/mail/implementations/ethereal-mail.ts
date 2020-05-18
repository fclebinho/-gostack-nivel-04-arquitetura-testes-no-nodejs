import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '@shared/providers';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err, account) => {
      // Create a SMTP transporter object
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  public async send(to: string, body: string): Promise<void> {
    // Message object
    const message = {
      from: 'Equipe GoBarber <equipe@gobarber.com>',
      to,
      subject: 'Recuperação de Senha',
      text: body,
    };

    const sendMessage = await this.client.sendMail(message);
    console.log(sendMessage);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(sendMessage));
  }
}

export default EtherealMailProvider;

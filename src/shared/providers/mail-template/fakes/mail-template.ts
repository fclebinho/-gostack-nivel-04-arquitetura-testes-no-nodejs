import {
  IMailTemplate,
  IMailTemplateParseDTO,
} from '@shared/providers/mail-template';

export default class MailTemplateFake implements IMailTemplate {
  public async parse({ template }: IMailTemplateParseDTO): Promise<string> {
    return template;
  }
}

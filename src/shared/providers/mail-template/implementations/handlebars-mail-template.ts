import handlebars from 'handlebars';

import {
  IMailTemplate,
  IMailTemplateParseDTO,
} from '@shared/providers/mail-template';

export default class HandlebarsMailTemplate implements IMailTemplate {
  public async parse({
    template,
    variables,
  }: IMailTemplateParseDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}

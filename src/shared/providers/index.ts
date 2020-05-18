import { container } from 'tsyringe';

import {
  IStorageProvider,
  DiskStorageProvider,
} from '@shared/providers/storage';

import { IMailProvider, EtherealMailProvider } from '@shared/providers/mail';

import {
  IMailTemplateProvider,
  HandlebarsMailTemplateProvider,
} from '@shared/providers/mail-template';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);

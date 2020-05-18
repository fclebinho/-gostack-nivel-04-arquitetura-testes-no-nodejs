import { container } from 'tsyringe';

import {
  IStorageProvider,
  DiskStorageProvider,
} from '@shared/providers/storage';

import { IMailProvider, EtherealMailProvider } from '@shared/providers/mail';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);

export * from './storage';
export * from './mail';

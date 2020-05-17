import { container } from 'tsyringe';

import {
  IStorageProvider,
  DiskStorageProvider,
} from '@shared/providers/storage';

import { IMailProvider, SendMailProvider } from '@shared/providers/mail';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailProvider>('MailProvider', SendMailProvider);

export * from './storage';
export * from './mail';

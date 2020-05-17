import { container } from 'tsyringe';

import {
  IStorageProvider,
  DiskStorageProvider,
} from '@shared/providers/storage';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

export * from './storage';

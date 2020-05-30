import { container } from 'tsyringe';

import { uploadConfig } from '@config/index';
import { IStorageProvider } from '@shared/providers/storage';
import DiskStorageProvider from './disk-storage';
import S3StorageProvider from './s3-storage';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);

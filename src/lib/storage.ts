/* import type { StorageProvider } from '@repo/storage-core';

let provider: StorageProvider | null = null;

export async function getStorageProvider(): Promise<StorageProvider> {
  if (provider) return provider;

  if (process.env.STORAGE_DRIVER === 'r2') {
    const { default: R2Provider } = await import('@repo/storage-r2');

    provider = new R2Provider({
      bucket: process.env.R2_BUCKET!,
      endpoint: process.env.R2_ENDPOINT!,
      accessKeyId: process.env.R2_ACCESS_KEY!,
      secretAccessKey: process.env.R2_SECRET!,
    });

    return provider;
  }

  if (process.env.STORAGE_DRIVER === 's3') {
    const { default: S3Provider } = await import('@repo/storage-s3');

    provider = new S3Provider({
      bucket: process.env.S3_BUCKET!,
    });

    return provider;
  }

  throw new Error('No storage provider configured');
}
 */
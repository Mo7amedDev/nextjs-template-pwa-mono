// apps/my-app/app/actions/files.ts
'use server';

import { uploadFile, deleteFile, replaceFile } from '@repo/storage-r2';

export async function uploadFileAction(formData: FormData) {
  const file = formData.get('file') as File;

  if (!file) {
    throw new Error('No file provided');
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const key = `uploads/${Date.now()}-${file.name}`;

  return await uploadFile(key, buffer, file.type);
}

export async function deleteFileAction(key: string) {
  if (!key) {
    throw new Error('File key is required');
  }

  await deleteFile(key);
}

export async function replaceFileAction(
  key: string,
  formData: FormData
) {
  const file = formData.get('file') as File;

  if (!file) {
    throw new Error('No file provided');
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return await replaceFile(key, buffer, file.type);
}

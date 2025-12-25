// apps/my-app/app/upload/page.tsx

import { deleteFileAction, replaceFileAction, uploadFileAction } from "@/actions/files";

 
export default function UploadPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>File Upload Test</h1>

      {/* Upload */}
      <form action={uploadFileAction}>
        <input type="file" name="file" required />
        <button type="submit">Upload</button>
      </form>

      <hr />

      {/* Delete */}
      <form
        action={async (formData) => {
          'use server';
          const key = formData.get('key') as string;
          await deleteFileAction(key);
        }}
      >
        <input name="key" placeholder="uploads/file-name.ext" />
        <button type="submit">Delete</button>
      </form>

      <hr />

      {/* Replace */}
      <form
        action={async (formData) => {
          'use server';
          const key = formData.get('key') as string;
          await replaceFileAction(key, formData);
        }}
      >
        <input name="key" placeholder="uploads/file-name.ext" />
        <input type="file" name="file" required />
        <button type="submit">Replace</button>
      </form>
    </div>
  );
}

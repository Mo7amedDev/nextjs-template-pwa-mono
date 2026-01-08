/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { getServerAuthSession } from "@repo/auth";
import { prisma } from "@repo/db";
import { deleteFileFromR2, fileExistsInR2, getFileMetadata, getPublicUrl, overwriteFileInR2, replaceFileInR2, uploadFileToR2 } from "@repo/storage-r2";

export type FileAction = "upload" | "replace" | "delete" | "exists" | "metadata";

export interface FileActionPayload {
  action: FileAction;
  key: string;        // Required for single file actions
  file?: File;        // For replace
}

export interface FileActionResult {
  success: boolean;
  error?: string;
  data?: any;
}

/**
 * Handle single-file R2 actions + database integration
 */
export async function fileAction(payload: FileActionPayload): Promise<FileActionResult> {
  const { action, key, file } = payload;

  if (!key) return { success: false, error: "Key is required" };

  // Get current user session
  const session = await getServerAuthSession();
  if (!session || !session.user) return { success: false, error: "unauthorized" };

  try {
    switch (action) {

      case "replace":
        if (!file) return { success: false, error: "File is required for replace" };
        await overwriteFileInR2(file, key);
        return { success: true, data: { key, url: getPublicUrl(key) } };

      case "delete":
        // Delete from R2 first
        await deleteFileFromR2(key);

        // Delete from database
        await prisma.file.deleteMany({
          where: { key, userId: session.user.id },
        });

        return { success: true, data: { deleted: true, key } };

      case "exists":
        const exists = await fileExistsInR2(key);
        return { success: true, data: { exists, key } };

      case "metadata":
        const metadata = await getFileMetadata(key);
        return { success: true, data: { key, metadata } };

      default:
        return { success: false, error: `Unsupported action: ${action}` };
    }
  } catch (err: any) {
    return { success: false, error: err?.message || "File action failed" };
  }
}


const ALLOWED_PATHS_R2 = ["/uploads", "/chatbot", "ai/images"] as const;

interface UploadFileOptions {
  files: File[];
  folderPath?: string;
}
interface UploadFilesResult {
  success: boolean;
  error?: string;
  files?: {
    id: string;
    key: string;
    url: string;
    name: string;
  }[];
}
/**
 * Upload one or more files to R2 with automatically generated unique keys
 * @param files Array of File objects
 * @param folderPath Folder to store files in. Default is "/uploads"
 *   Allowed paths: "/uploads", "/chatbot", "ai/images"
 * @returns Array of uploaded files with { key, url }
 * 
 * Output example:
 * [
  {
    "key": "/uploads/5e9f3eab-4a87-4a62-8c9b-123456789abc-photo.png",
    "url": "https://<your-r2-domain>/uploads/5e9f3eab-4a87-4a62-8c9b-123456789abc-photo.png"
  },
  ]
 */

export async function uploadFilesAction({ files, folderPath = "/uploads" }: UploadFileOptions): Promise<UploadFilesResult> {
  if (!files || files.length === 0) {
    return { success: false, error: "At least one file is required" };
  }

  // Get current user session
  const session = await getServerAuthSession();

  // If no user is logged in, return unauthorized
  if (!session || !session.user) {
    return { success: false, error: "unauthorized" };
  }

  const userId = session.user.id;

  // Normalize folder path (remove trailing slash)
  const normalizedFolder = folderPath.replace(/\/+$/, "");

  // Validate folder path
  if (!ALLOWED_PATHS_R2.includes(normalizedFolder as typeof ALLOWED_PATHS_R2[number])) {
    return { success: false, error: `Invalid folder path "${folderPath}". Allowed paths: ${ALLOWED_PATHS_R2.join(", ")}` };
  }

  try {
    // Upload files with unique keys and save to DB
    const uploaded = await Promise.all(
      files.map(async (file) => {
        const uuid = crypto.randomUUID();
        const sanitizedName = file.name.replace(/\s+/g, "-");
        const key = `${normalizedFolder}/${uuid}-${sanitizedName}`;

        // 1️⃣ Upload to R2
        await uploadFileToR2(file, key);
        const url = getPublicUrl(key);

        // 2️⃣ Save metadata to database
        const fileRecord = await prisma.file.create({
          data: {
            key,
            url,
            name: file.name,
            contentType: file.type,
            size: file.size,
            folder: normalizedFolder,
            userId,
          },
        });

        return {
          id: fileRecord.id,
          key: fileRecord.key,
          url: fileRecord.url,
          name: fileRecord.name,
        };
      })
    );

    return { success: true, files: uploaded };
  } catch (err: any) {
    return { success: false, error: err?.message || "Upload failed" };
  }
}
//
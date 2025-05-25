import { randomUUID } from "node:crypto";
import { basename, extname } from "node:path";
import { Readable } from "node:stream";
import { Upload } from "@aws-sdk/lib-storage";
import { z } from "zod";

import { env } from "@/env";
import { r2 } from "./client";

const uploadFileToStorageSchema = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
});

type UploadFileToStorageInput = z.input<typeof uploadFileToStorageSchema>;

export async function uploadFileToStorage(input: UploadFileToStorageInput) {
  const { fileName, contentType, contentStream } = uploadFileToStorageSchema.parse(input);

  const fileExtension = extname(fileName);
  const fileNameWithoutExtension = basename(fileName, fileExtension);
  const sanitizedFileName = fileNameWithoutExtension.replace(/[^a-zA-Z0-9]/gi, "");

  const sanitizedFileNameWithExtension = sanitizedFileName.concat(fileExtension);

  const uniqueFileName = `downloads/${randomUUID()}-${sanitizedFileNameWithExtension}`;

  const upload = new Upload({
    client: r2,
    params: {
      Key: uniqueFileName,
      Body: contentStream,
      ContentType: contentType,
      Bucket: env.CLOUDFLARE_BUCKET,
    },
  });

  await upload.done();

  return {
    key: uniqueFileName,
    url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
  };
}

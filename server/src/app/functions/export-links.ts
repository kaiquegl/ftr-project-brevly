import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { stringify } from "csv-stringify";

import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { type Either, makeLeft, makeRight } from "@/utils/either";
import { LinksEmpty } from "./errors/links-empty";

type ExportLinksOutput = {
  reportUrl: string;
};

export async function exportLinks(): Promise<Either<LinksEmpty, ExportLinksOutput>> {
  const { sql, params } = db
    .select({
      id: schema.links.id,
      createdAt: schema.links.createdAt,
      originalLink: schema.links.originalLink,
      shortLink: schema.links.shortLink,
    })
    .from(schema.links)
    .toSQL();

  const { count } = await pg.unsafe(sql, params as string[]).execute();

  if (count === 0) {
    return makeLeft(new LinksEmpty());
  }

  const cursor = pg.unsafe(sql, params as string[]).cursor(2);

  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      { key: "id", header: "ID" },
      { key: "created_at", header: "Created At" },
      { key: "original_link", header: "Original Link" },
      { key: "short_link", header: "Short Link" },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }

        callback();
      },
    }),
    csv,
    uploadToStorageStream
  );

  const uploadToStorage = uploadFileToStorage({
    contentType: "text/csv",
    contentStream: uploadToStorageStream,
    fileName: `${new Date().toISOString()}-links.csv`,
  });

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

  return makeRight({ reportUrl: url });
}

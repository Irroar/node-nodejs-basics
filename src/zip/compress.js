import { createGzip } from 'zlib';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const compress = async () => {
  const pipe = promisify(pipeline);
  const sourceName = 'fileToCompress.txt';
  const pathToSource = join(__dirname, 'files', sourceName);

  const archiveName = 'archive.gz';
  const pathToArchive = join(__dirname, 'files', archiveName);

  const sourseReadStream = createReadStream(pathToSource);
  const destinationWriteStream = createWriteStream(pathToArchive);

  const gzipTransformStream = createGzip();
  
  try {
    await pipe(sourseReadStream, gzipTransformStream, destinationWriteStream);
  } catch(err) {
    console.log(err);
  }

};

compress();
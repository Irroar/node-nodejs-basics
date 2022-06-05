import { createGunzip } from 'zlib';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const decompress = async () => {
  const pipe = promisify(pipeline);
  const sourceName = 'archive.gz';
  const pathToSource = join(__dirname, 'files', sourceName);

  const decompressedFileName = 'fileToCompress.txt';
  const pathTorecompressedFile = join(__dirname, 'files', decompressedFileName);

  const sourseReadStream = createReadStream(pathToSource);
  const destinationWriteStream = createWriteStream(pathTorecompressedFile);

  const gunzipTransformStream = createGunzip();
  
  try {
    await pipe(sourseReadStream, gunzipTransformStream, destinationWriteStream);
  } catch(err) {
    console.log(err);
  }
};

decompress();
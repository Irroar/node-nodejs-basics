import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import CustomFSError from './utils/CustomError.js';
import { isExists } from './utils/exist.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const read = async () => {
  const pathToFile = join(__dirname, 'files', 'fileToRead.txt');

  try {
    const isFileExists = await isExists(pathToFile);
    if (!isFileExists) {
      throw new CustomFSError('FS operation failed');
    }

    const rs = createReadStream(pathToFile);
    rs.pipe(process.stdout);

  } catch(err) {
    console.log(err);
  }
};

read();
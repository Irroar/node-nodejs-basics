import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readdir, access } from 'fs/promises';
import CustomFSError from './CustomError.js';
import { isExists } from './utils/exist.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const list = async () => {
  const pathToFolder = join(__dirname, 'files');

  try {
    const isDirExists = await isExists(pathToFolder);

    if (!isDirExists) {
      throw new CustomFSError('FS operation failed');
    }

    const fileNames = await readdir(pathToFolder);

    fileNames.forEach((fileName) => {
      console.log(fileName);
    });
  } catch(err) {
    console.log(err);
  }
};

list();
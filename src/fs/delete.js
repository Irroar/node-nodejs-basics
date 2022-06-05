import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { rm } from 'fs/promises';
import CustomFSError from './utils/CustomError.js';
import { isExists } from './utils/exist.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const remove = async () => {
  const pathToFile = join(__dirname, 'files', 'fileToRemove.txt');
  
  try {
    const isFileExists = await isExists(pathToFile);
    if (!isFileExists) {
      throw new CustomFSError('FS operation failed');
    }
    await rm(pathToFile);
  } catch(err) {
    console.log(err);
  }
};

remove();
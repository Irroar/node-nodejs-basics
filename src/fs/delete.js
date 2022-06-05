import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { rm } from 'fs/promises';
import CustomFSError from './CustomError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const remove = async () => {
  const pathToFile = join(__dirname, 'files', 'fileToRemove.txt');
  
  try {
    await rm(pathToFile);
  } catch(err) {
    if (err.code === 'ENOENT') { 
      throw new CustomFSError('FS operation failed'); 
    }
  }
};

remove();
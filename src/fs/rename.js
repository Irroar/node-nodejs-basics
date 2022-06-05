import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { rename as renameFunc, access } from 'fs/promises';
import CustomFSError from './CustomError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function isFileExists(pathToFile) {
  try {
    await access(pathToFile);
    return true;
  } catch(err) {
    return false;
  }
}

export const rename = async () => {
  const pathToOldFile = join(__dirname, 'files', 'wrongFilename.txt');
  const pathToNewFile = join(__dirname, 'files', 'properFilename.md');

  try {
    const isFileExist = await isFileExists(pathToNewFile);
    if (isFileExist) { throw new CustomFSError('FS operation failed'); }
    await renameFunc(pathToOldFile, pathToNewFile);
  } catch(err) {
    if (err.code === 'ENOENT') { 
      throw new CustomFSError('FS operation failed'); 
    } else {
      console.log(err);
    }
  }

};

rename();
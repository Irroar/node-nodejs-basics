import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { rename as renameFunc, access } from 'fs/promises';
import CustomFSError from './utils/CustomError.js';
import { isExists } from './utils/exist.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const rename = async () => {
  const pathToOldFile = join(__dirname, 'files', 'wrongFilename.txt');
  const pathToNewFile = join(__dirname, 'files', 'properFilename.md');

  try {
    const isNewFileExists = await isExists(pathToNewFile);
    const isOldFileExists = await isExists(pathToOldFile);
    if (!isOldFileExists || isNewFileExists) { throw new CustomFSError('FS operation failed'); }

    await renameFunc(pathToOldFile, pathToNewFile);
  } catch(err) {
    console.log(err);
  }

};

rename();
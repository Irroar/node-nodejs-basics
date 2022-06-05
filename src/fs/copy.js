import { copyFile, mkdir, readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import CustomFSError from './utils/CustomError.js';
import { isExists } from './utils/exist.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const copy = async (subFolderName='') => {
  const pathToSourceFolder = join(__dirname, 'files', subFolderName);
  const pathToDestinationFolder = join(__dirname, 'files_copy', subFolderName);

  try {
    const isSourceFolderExists = await isExists(pathToSourceFolder);
    const isDestinationFolderExists = await isExists(pathToDestinationFolder);

    if (!isSourceFolderExists || isDestinationFolderExists) { 
      throw new CustomFSError('FS operation failed'); 
    }

    await mkdir(pathToDestinationFolder);
    const fileDirents = await readdir(pathToSourceFolder, { withFileTypes: true });

    for (let fileDirent of fileDirents) {
      if (fileDirent.isDirectory()) {
        copy(fileDirent.name);
      } else if (fileDirent.isFile()) {
        const pathToSourceFile = join(pathToSourceFolder, fileDirent.name);
        const pathToDestinationFile = join(pathToDestinationFolder, fileDirent.name);
        await copyFile(pathToSourceFile, pathToDestinationFile);
      }
    }

  } catch(err) {
    console.log(err);
  }

};

copy();
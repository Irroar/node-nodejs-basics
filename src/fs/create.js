import { access, appendFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import CustomFSError from './utils/CustomError.js';
import { isExists } from './utils/exist.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const create = async () => {
  const fileName = 'fresh.txt';
  const pathToFile = join(__dirname, 'files', fileName);
  const content = 'I am fresh and young';

  try {
    const isFileExists = await isExists(pathToFile);
    if (isFileExists) {
      throw new CustomFSError('FS operation failed');
    }
    await appendFile(pathToFile, content);
    console.log('File was successfuly created') 
  }
  catch(err) {
    console.log(err);
  }

};

create();
import { access, appendFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import CustomFSError from './CustomError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const create = async () => {
  const fileName = 'fresh.txt';
  const pathToFile = join(__dirname, fileName);
  const content = 'I am fresh and young';

  try {
    await access(pathToFile);
    throw new CustomFSError('FS operation failed');
  }
  catch(err) {
    if (err instanceof CustomFSError) { console.log(err); }
    else { 
      await appendFile(pathToFile, content);
      console.log('File was successfuly created') 
    }
  }

};

create();
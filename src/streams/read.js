import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const read = async () => {
  const fileName = 'fileToRead.txt';
  const pathToFile = join(__dirname, 'files', fileName);

  try {
    const rs = createReadStream(pathToFile);
    rs.pipe(process.stdout);
  } catch(err) {
    console.log(err);
  }
};

read();
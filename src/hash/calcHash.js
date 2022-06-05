import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const calculateHash = async () => {
  const fileName = 'fileToCalculateHashFor.txt';
  const pathToFile = join(__dirname, 'files', fileName);

  const hash = createHash('sha256');

  try {
    const rs = createReadStream(pathToFile);
    rs.on('readable', () => {
      const data = rs.read();
      if (data) {
        hash.update(data);
      }
      else {
        console.log(hash.digest('hex'));
      }
    });
  } catch(err) {
    console.log(err);
  }
};

calculateHash();
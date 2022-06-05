import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createInterface } from 'readline';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const write = async () => {
  const fileName = 'fileToWrite.txt';
  const pathToFile = join(__dirname, 'files', fileName);

  const rl = createInterface({ input: process.stdin, output: process.stdout });

  try {
    const ws = createWriteStream(pathToFile);
    rl.on('line', (line) => { 
      ws.write(`${line}\n`);
    });
    rl.on('close', () => {
      ws.end();
      process.exit();
    });
  } catch(err) {
    console.log(err);
  }
};

write();
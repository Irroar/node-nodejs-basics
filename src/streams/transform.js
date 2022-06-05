import { Transform, pipeline } from 'stream';

export const transform = async () => {
  const ws = process.stdout;
  const rs = process.stdin;

  const reversedStream = new Transform({
    transform(chunk, _, callback) {
      const str = chunk.toString().trim();
      const reversedStr = str.split('').reverse().join('');
      this.push(`${reversedStr}\n`);
      callback();
    }
  });

  pipeline(rs, reversedStream, ws, err => {
    console.log(err);
  });
};

transform();
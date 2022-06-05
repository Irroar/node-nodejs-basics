export const parseArgs = () => {
  const args = process.argv.slice(2);
  console.log(args)
  for (let i = 2; i < args.length + 2; i += 2) {
    console.log(`${args[i - 2].slice(2)} is ${args[i - 1]}`);
  }
};

parseArgs();
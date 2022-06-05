export const parseEnv = () => {
  const rssVariables = Object.keys(process.env).filter((item) => item.indexOf('RSS_') === 0);
  const strs = [];
  rssVariables.forEach((variableName) => {
    strs.push(`${variableName}=${process.env[variableName]}`);
  })
  const outputStr = strs.join('; ');
  console.log(outputStr);
};

parseEnv();
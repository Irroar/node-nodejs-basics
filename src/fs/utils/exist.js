import { access } from 'fs/promises';

export const isExists = async (pathToFile) => {
  try {
    await access(pathToFile);
    return true;
  } catch(err) {
    return false;
  }
}
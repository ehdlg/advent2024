import { readFile } from 'fs/promises';

export async function getContentsFromFile(path: string) {
  try {
    const fileContents = await readFile(path, { encoding: 'utf-8' });

    return fileContents;
  } catch (error) {
    throw error;
  }
}

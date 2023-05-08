import { promises as fs } from 'fs';

export async function existsFile(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

export const isActiveCache = async (): Promise<boolean> => {
  const path =
    '/var/www/vhosts/futbolecuador.com/subdomains/admin/partido/cache.json';

  if (await existsFile(path)) {
    const settings = await fs.readFile(path, { encoding: 'utf8' });
    const json = JSON.parse(settings);
    return !json.partidoActivo;
  }

  return true;
};

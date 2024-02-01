import { existsSync } from 'node:fs';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const appDir = path.join(os.homedir(), '.genpass');

if (!existsSync(appDir)) {
  await mkdir(appDir);
}
const filePath = path.join(appDir, 'settings.genpass.json');

//*====================================================================*/

export const saveSettings = async options => {
  await writeFile(filePath, JSON.stringify(options), 'utf-8');
};

export const getSettings = async () => {
  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    process.stdout.write(`
    Файл настроек отсутствует или недоступен.
    Для сохранения настроек запускайте скрипт с ключом "settings".\n`);
  }
};

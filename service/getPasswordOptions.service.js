import readline from 'node:readline/promises';
import process from 'node:process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const getPasswordOptions = async () => {
  const length = parseInt(await rl.question('Длина пароля[8]: ')) || 8;
  const uppercase =
    ((
      await rl.question('Включать заглавные буквы? (y/n) [y] ')
    ).toLowerCase() || 'y') === 'y';
  const number =
    ((await rl.question('Включать цифры? (y/n) [y] ')).toLowerCase() || 'y') ===
    'y';
  const special =
    ((await rl.question('Включать спецсимволы? (y/n) [y] ')).toLowerCase() ||
      'y') === 'y';

  return { length, uppercase, number, special };
};

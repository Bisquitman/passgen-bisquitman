#!/usr/bin/env node

import { generatePassword } from './service/generatePassword.service.js';
import { getPasswordOptions } from './service/getPasswordOptions.service.js';
import { getSettings, saveSettings } from './service/settings.service.js';
import { argsParse } from './util/argsParse.js';

const app = async () => {
  const args = argsParse(process.argv, ['ask', 'settings']);

  const options = {
    length: 8,
    uppercase: false,
    number: false,
    special: false,
  };

  if (!args.settings) {
    const settings = await getSettings();
    Object.assign(options, settings);
  }

  if (args.a || args.ask) {
    console.log('Ответьте на вопросы:');
    const options = await getPasswordOptions();
    const password = generatePassword(options);
    process.stdout.write(`Пароль: "${password}"\n`);
    process.exit();
  }

  if (args.h || args.help) {
    console.log(`
      -h --help       |   список команд (остальные команды игнорируются)
      -l --length     |   длина пароля
      -u --uppercase  |   буквы в верхнем регистре
      -n --number     |   включить цифры
      -s --special    |   включить спецсимволы
      ask -a          |   провести опрос (остальные команды игнорируются)
      settings        |   сохраняет настройки из параметров (-l -u -n -s)
    `);

    process.exit();
  }

  if (args.l || args.length) {
    process.stdout.write(`\nДлина пароля: ${args.l || args.length}\n`);
    options.length = +(args.l || args.length);
  }

  if (args.u || args.uppercase) {
    process.stdout.write('БОЛЬШИЕ буквы\n');
    options.uppercase = args.u || args.uppercase;
  }

  if (args.n || args.number) {
    process.stdout.write('Цифры\n');
    options.number = args.n || args.number;
  }

  if (args.s || args.special) {
    process.stdout.write('Спецсимволы\n');
    options.special = args.s || args.special;
  }

  if (args.settings) {
    await saveSettings(options);
    process.exit();
  }

  const password = generatePassword(options);
  process.stdout.write(`Пароль: "${password}"\n`);
  process.exit();
};

app();

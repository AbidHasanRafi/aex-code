import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import boxen from 'boxen';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { initCommand } from './commands/init.js';
import { chatCommand } from './commands/chat.js';
import { configCommand } from './commands/config.js';
import { editCommand } from './commands/edit.js';
import { runCommand } from './commands/run.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
);

const program = new Command();

const aexTheme = chalk.hex('#74ffd8');

const bannerText = figlet.textSync('AEX Code', { font: 'ANSI Shadow', horizontalLayout: 'fitted' });
const coloredBanner = aexTheme(bannerText);
const rawTagline = ' POWERED BY AI EXTENSION - NEXT-GEN CODING AGENT ';

const finalBanner = boxen(`${coloredBanner}\n\n${chalk.bgHex('#74ffd8').black.bold(rawTagline)}`, {
  padding: 1,
  margin: 1,
  borderStyle: 'bold',
  borderColor: '#74ffd8',
  textAlignment: 'center',
});

program
  .name('aex-code')
  .description(`${finalBanner}\n${chalk.dim('A powerful CLI agent optimized for OpenRouter free-tier LLMs.')}`)
  .version(packageJson.version);

program
  .command('init')
  .description('Initialize AEX Code in the current workspace')
  .action(initCommand);

program
  .command('chat')
  .description('Start an interactive chat session with AEX Code')
  .action(chatCommand);

program
  .command('config')
  .description('Configure API keys and default models for AEX Code')
  .option('--set-key <key>', 'Set OpenRouter API key')
  .option('--set-model <model>', 'Set default OpenRouter model')
  .action(configCommand);

program
  .command('edit <file>')
  .description('Edit or analyze a file locally')
  .action(editCommand);

program
  .command('run <cmd>')
  .description('Run a shell command safely')
  .action(runCommand);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

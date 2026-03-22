import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export function initCommand() {
    console.log(chalk.green('Initializing AEX Code project...'));
    const configPath = path.join(process.cwd(), '.aex-code');

    if (!fs.existsSync(configPath)) {
        fs.mkdirSync(configPath);
        fs.writeFileSync(path.join(configPath, 'rules.md'), '# AEX Code Project Rules\n\nAdd project-specific rules here.');
        console.log(chalk.green('✔ Initialized .aex-code directory securely.'));
    } else {
        console.log(chalk.yellow('AEX Code project already initialized in this directory.'));
    }
}

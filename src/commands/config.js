import chalk from 'chalk';
import { saveConfig } from '../utils/configManager.js';

const aexTheme = chalk.hex('#74ffd8');

export const configCommand = (options) => {
    if (options.setKey) {
        // Automatically strip accidental quotes just in case
        const cleanKey = options.setKey.replace(/^['"]|['"]$/g, '');
        saveConfig({ OPENROUTER_API_KEY: cleanKey });
        console.log(aexTheme('■ OpenRouter API Key configured successfully.'));
    }

    if (options.setModel) {
        const cleanModel = options.setModel.replace(/^['"]|['"]$/g, '');
        saveConfig({ OPENROUTER_DEFAULT_MODEL: cleanModel });
        console.log(aexTheme(`■ Default Model set to ${cleanModel}.`));
    }

    if (!options.setKey && !options.setModel) {
        console.log(chalk.yellow('Usage: aex-code config --set-key <key> or --set-model <model>'));
    }
};

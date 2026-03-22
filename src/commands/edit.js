import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import ora from 'ora';
import { createClient, getDefaultModel } from '../utils/openrouter.js';

export async function editCommand(file, options) {
    if (!fs.existsSync(file)) {
        console.log(chalk.red(`File ${file} does not exist.`));
        process.exit(1);
    }
    
    console.log(chalk.blue(`Suggesting edits for ${file}...`));
    const content = fs.readFileSync(file, 'utf-8');
    
    const client = createClient();
    const spinner = ora('AEX Code is analyzing the file...').start();
    
    try {
        const response = await client.chat.completions.create({
            model: getDefaultModel(),
            messages: [
                { role: 'system', content: 'You are AEX Code. Please evaluate this code file and suggest improvements. Keep output concise.' },
                { role: 'user', content: `File name: ${file}\n\nCode:\n\`\`\`\n${content}\n\`\`\`` }
            ]
        });
        spinner.stop();
        console.log(chalk.green(response.choices[0].message.content));
    } catch (e) {
        spinner.fail('Error analyzing file.');
        console.log(chalk.red(e.message));
    }
}

import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';
import path from 'path';
import boxen from 'boxen';
import { createClient, getDefaultModel, debugApiKey } from '../utils/openrouter.js';

const SYSTEM_PROMPT = `You are AEX Code, an advanced coding agent. You provide short, actionable coding assistance. 
If asked to edit a file, provide the full file contents or explicitly outline what to change in the file.
Try to use <tool_call> JSON format for file writes if possible.
`;

let conversationHistory = [];

export async function chatCommand() {
    console.clear();
    const chatHeader = boxen(chalk.greenBright.bold('A E X   C O D E'), {
        padding: 1, margin: 1, borderStyle: 'bold', borderColor: 'green'
    });
    console.log(chatHeader);
    console.log(chalk.green(`  ■ Target Model    : ${chalk.gray(getDefaultModel())}`));
    console.log(chalk.green(`  ■ Exit Command    : ${chalk.gray("'exit'")}\n`));

    let client;
    try {
        client = createClient();
    } catch (e) {
        console.log(chalk.red(e.message));
        process.exit(1);
    }
    
    conversationHistory.push({ role: 'system', content: SYSTEM_PROMPT });

    while (true) {
        process.stdout.write('\n');
        const { userInput } = await inquirer.prompt([
            {
                type: 'input',
                name: 'userInput',
                message: chalk.bold.green('■ USER : '),
            }
        ]);

        if (userInput.trim().toLowerCase() === 'exit') {
            console.log(chalk.green('\n■ SESSION TERMINATED.'));
            break;
        }

        conversationHistory.push({ role: 'user', content: userInput });

        process.stdout.write('\n');
        const spinner = ora({
            text: chalk.italic.green('AEX PROCESSSING...'),
            color: 'green',
        }).start();
        
        try {
            const response = await client.chat.completions.create({
                model: getDefaultModel(),
                messages: conversationHistory,
                stream: true,
            });

            spinner.stop();
            process.stdout.write(`${chalk.bgGreen.black.bold(' ■ AEX AGENT ')} `);
            
            let fullContent = '';
            for await (const chunk of response) {
                const text = chunk.choices[0]?.delta?.content || '';
                process.stdout.write(chalk.green(text));
                fullContent += text;
            }
            console.log('\n');
            conversationHistory.push({ role: 'assistant', content: fullContent });

        } catch (e) {
            spinner.stop();
            console.log(chalk.bgRed.white.bold(' ■ ERROR '));
            if (e.status === 429) {
                console.log(chalk.red(`\nRate Limit or Provider Error (429): The active model (${getDefaultModel()}) is currently overloaded.`));
                console.log(chalk.yellow(`Tip: Try swapping your model using:\naex-code config --set-model "google/gemini-2.0-flash-lite-preview-02-05:free"\n`));
            } else if (e.status === 401) {
                console.log(chalk.red(`\nUnauthorized (401): Your API key is invalid or not recognized by OpenRouter.`));
            } else {
                console.log(chalk.red(`\nFailed to reach OpenRouter API: ${e.message}\n`));
            }
            conversationHistory.pop();
        }
    }
}

import { exec } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

export function runCommand(cmdString) {
    const spinner = ora(`Running: ${cmdString}`).start();
    
    exec(cmdString, (error, stdout, stderr) => {
        spinner.stop();
        if (error) {
            console.error(chalk.red(`Error executing command: ${error.message}`));
            return;
        }
        if (stderr) {
            console.error(chalk.yellow(`Output:\n${stderr}`));
        }
        if (stdout) {
            console.log(chalk.green(`Result:\n${stdout}`));
        }
    });
}

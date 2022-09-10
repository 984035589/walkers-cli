import { Command } from 'commander'
import { download } from 'obtain-git-repo'
import { createSpinner } from 'nanospinner'
import chalk from 'chalk'
import pkg from '../package.json'
import inquirer from 'inquirer'
import fs from 'fs'
import { templates, getTemplateByName } from './templates'

const program = new Command()

program
    .name(chalk.green('walkers-cli'))
    .description('CLI to some Web template seed')
    .version(chalk.green(`${pkg.version}`))

program
    .command('init')
    .description('generate a project from a template ')
    .action(async () => {
        const answerTemplate = await inquirer.prompt([
            {
                type: 'rawlist',
                name: 'template',
                message: 'Select template',
                choices: templates
            }
        ])
        const answerDirname = await inquirer.prompt([
            {
                name: 'dirname',
                type: 'input',
                message: 'Please enter a directory name',
                default() {
                    return answerTemplate.template
                }
            }
        ])
        const dirIsExists = fs.existsSync(answerDirname.dirname)
        if (dirIsExists) {
            console.log(chalk.redBright('directory already exists'))
        } else {
            const spinner = createSpinner('start download...').start()
            const url = getTemplateByName(answerTemplate.template)?.url as string
            download(url, answerDirname.dirname, { clone: true }, function (err) {
                if (err) {
                    spinner.error({ text: chalk.redBright(`download failed, url: ${url}`) })
                } else {
                    spinner.success({
                        text: 'The project was created successfully. For details, please refer to the project readme'
                    })
                    return
                }
            })
        }
    })

program.parse(process.argv)

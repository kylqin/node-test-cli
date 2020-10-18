import { Command } from '@oclif/command'
import chalk from 'chalk'
import * as fs from 'fs'
import ora from 'ora'
import { join } from 'path'
import { getTemplateDir, collectionType, getCwd } from '../utils'

const { mkdir, readFile, writeFile } = fs.promises

export default class New extends Command {
  static description = 'Initial nodejs test collection'

  static examples = [
    `$ ntest new nuit
`
  ]

  static flags = {}

  static args = [{ name: 'unitName' }]

  async run() {
    const templateDir = getTemplateDir()
    const type = collectionType()
    const cwd = getCwd()
    const spinner = ora('Creating test unit').start()

    const { args } = this.parse(New)
    const { unitName } = args

    const unitDir = join(cwd, 'units', unitName)
    try {
      await mkdir(unitDir)
    } catch (err) {
      spinner.fail()
      console.log(chalk.red(`Test unit ${unitName} already existed.`))
      process.exit(0)
    }

    const unitContent = await readFile(join(templateDir, type, `unit.${type}`), { encoding: 'utf-8' })
    await writeFile(join(unitDir, `index.${type}`), unitContent)

    await mkdir(join(unitDir, '__test__'))

    const unitTestContent = await readFile(join(templateDir, type, `unit.test.${type}`), { encoding: 'utf-8' })
    await writeFile(join(unitDir, '__test__', `index.spec.${type}`), unitTestContent)

    spinner.succeed()
    spinner.text = `Test unit ${unitName} created`
    spinner.succeed()
  }
}

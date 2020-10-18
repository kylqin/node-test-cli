import { Command, flags } from '@oclif/command'
import chalk from 'chalk'
import * as fs from 'fs'
import ora from 'ora'
import { join } from 'path'
import { getTemplateDir, getCwd } from '../utils'

const { mkdir, readFile, writeFile } = fs.promises

export default class Init extends Command {
  static description = 'Initial nodejs test collection'

  static examples = [
    `$ ntest init name
`
  ]

  static flags = {
    type: flags.enum({
      char: 't',
      description: 'Which language to use (javascript or typescript)',
      options: ['js', 'ts'],
      default: 'js'
    })
  }

  static args = [{ name: 'collectionName' }]

  async run() {
    const cwd = getCwd()
    const templateDir = getTemplateDir()

    const spinner = ora('Creating test collection').start()

    const { args, flags } = this.parse(Init)
    const { collectionName } = args
    const { type } = flags

    const collectionDir = join(cwd, collectionName)

    try {
      await mkdir(collectionDir)
    } catch (err) {
      spinner.fail()
      console.log(chalk.red(`Directory ${collectionName} already existed.`))
      process.exit(0)
    }

    const packageContent = await readFile(join(templateDir, type, 'package.json'), { encoding: 'utf-8' })
    await writeFile(join(collectionDir, 'package.json'), packageContent.replace('collection-name', collectionName))

    const jestConfigContent = await readFile(join(templateDir, type, 'jest.config.js'), { encoding: 'utf-8' })
    await writeFile(join(collectionDir, 'jest.config.js'), jestConfigContent)

    await mkdir(join(collectionDir, 'units'))

    if (type === 'ts') {
      // Create babel.config.js
      await writeFile(join(collectionDir, 'babel.config.js'), `module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ]
}
`)
      // Create tsconfig.json
    await writeFile(join(collectionDir, 'tsconfig.json'), `{
  "compilerOptions": {
    "declaration": true,
    "importHelpers": true,
    "module": "commonjs",
    "outDir": "lib",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "target": "es2017"
  },
  "include": [
    "src/**/*"
  ]
}
`)
    }

    spinner.succeed()
    spinner.text = `Test collection ${collectionName} created`
    spinner.succeed()
  }
}

import { Command, flags } from '@oclif/command'
import ora from 'ora'

export default class Init extends Command {
  static description = 'Initial nodejs test collection'

  static examples = [
    `$ ntest init name
`
  ]

  static flags = {}

  static args = [{ name: 'name' }]

  async run() {
    const spinner = ora('Creating test collection').start()

    const { args, flags } = this.parse(Init)

    const { name } = args

    spinner.succeed()
    spinner.text = `Test collection ${name} created`
    spinner.succeed()
  }
}

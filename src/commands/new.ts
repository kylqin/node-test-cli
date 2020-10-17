import { Command, flags } from '@oclif/command'
import ora from 'ora'

export default class New extends Command {
  static description = 'Initial nodejs test collection'

  static examples = [
    `$ ntest init name
`
  ]

  static flags = {}

  static args = [{ name: 'name' }]

  async run() {
    const spinner = ora('Creating test collection').start()

    const { args, flags } = this.parse(New)

    const { name } = args

    spinner.succeed()
    spinner.text = `Test collection ${name} created`
    spinner.succeed()
  }
}


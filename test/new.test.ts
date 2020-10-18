import { test } from '@oclif/test'
import * as fs from 'fs'
import { doseFileExist } from './utils'
import { join } from 'path'
import * as rimraf from 'rimraf'
import Init from '../src/commands/init'
import New from '../src/commands/new'

const { mkdir, writeFile } = fs.promises

describe('new', () => {
  const workspace = join(process.cwd(), 'workspace-new')

  beforeAll(async () => {
    await mkdir(workspace)
  })

  afterAll(() => {
    rimraf.sync(workspace)
  })

  it('should create test unit', async () => {
    expect(await doseFileExist(workspace)).toBe(true)

    process.chdir(workspace)
    await Init.run(['book'])

    process.chdir(join(workspace, 'book'))
    await New.run(['add'])

    expect(await doseFileExist(join(workspace, 'book', 'units', 'add', 'index.js'))).toBe(true)
    expect(await doseFileExist(join(workspace, 'book', 'units', 'add', '__test__', 'index.spec.js'))).toBe(true)
  })
})


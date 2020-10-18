import { expect, test } from '@oclif/test'
import * as fs from 'fs'
// import mockFs from 'mock-fs'
import { join } from 'path'
import * as rimraf from 'rimraf'
// import * as utils from '../src/utils'
import { doseFileExist } from './utils'

// jest.mock('../src/utils')

const { mkdir } = fs.promises

describe('init', () => {
  const workspace = join(process.cwd(), 'workspace')
  // const workspace = './workspace'

  //  ;(utils.getCwd as jest.Mock<typeof utils.getCwd>).mockReturnValue(workspace)
  // ;(utils.getCwd as any).mockReturnValue(workspace)

  beforeAll(async () => {
    await mkdir(workspace)
    await mkdir(join(workspace, 'existed-collection'))
    process.chdir(workspace)

    // mockFs({
    //   [workspace]: {
    //     'existed-collection': {}
    //   }
    // })
  })

  afterAll(() => {
    rimraf.sync(workspace)
    // mockFs.restore()
  })

  // it('workspace existed', async () => {
  //   expect(await doseFileExist(workspace)).to.equal(true)
  //   expect(await doseFileExist(join(workspace, 'existed-collection'))).to.equal(true)

  //   expect(utils.getCwd()).to.equal(workspace)
  // })

  test
    .command(['init', 'book'])
    // .stdout()
    .it('should create test collection', async ctx => {
      // console.log('stdout', ctx.stdout)
      expect(await doseFileExist(join(workspace, 'book', 'package.json'))).to.equal(true)
      expect(await doseFileExist(join(workspace, 'book', 'jest.config.js'))).to.equal(true)
      expect(await doseFileExist(join(workspace, 'book', 'units'))).to.equal(true)
    })

  test
    .command(['init', 'book-ts', '-tts'])
    .it('should create typescript test collection', async ctx => {
      expect(await doseFileExist(join(workspace, 'book-ts', 'package.json'))).to.equal(true)
      expect(await doseFileExist(join(workspace, 'book-ts', 'jest.config.js'))).to.equal(true)
      expect(await doseFileExist(join(workspace, 'book-ts', 'units'))).to.equal(true)
      expect(await doseFileExist(join(workspace, 'book-ts', 'babel.config.js'))).to.equal(true)
      expect(await doseFileExist(join(workspace, 'book-ts', 'tsconfig.json'))).to.equal(true)
      expect(require(join(workspace, 'book-ts', 'package.json')).ntest.type).to.equal('ts')
    })

  test
    .command(['init', 'existed-collection'])
    .catch(err => {
      console.log(err)
    })
    .exit(0)
    // .it('should bark on create test collection whose name is already existed in current directory', async (ctx) => {})
})

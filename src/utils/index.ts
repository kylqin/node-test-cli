import * as fs from 'fs'
import { join } from 'path'

export const getTemplateDir = () => join(__dirname, '../../templates')

export const getCwd = () => process.cwd()

export const collectionType = () => require(join(getCwd(), 'package.json')).ntest.type

import * as fs from 'fs'

export const doseFileExist = (path: string) =>
  fs.promises
    .access(path)
    .then(() => true)
    .catch(() => false)


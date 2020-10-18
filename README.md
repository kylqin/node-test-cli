# node-test-cli

Create node js/ts unit tests.
[![NPM version][npm-image]][npm-url]
<!-- [![npm download][download-image]][download-url] -->

[npm-image]: http://img.shields.io/npm/v/node-test-cli.svg?style=flat-square
[npm-url]: http://npmjs.org/package/node-test-cli
<!-- [download-image]: https://img.shields.io/npm/dm/node-test-cli.svg?style=flat-square
[download-url]: https://npmjs.org/package/node-test-cli -->

## Usage

```sh
Create node js/ts unit tests.

VERSION
  node-test-cli/1.0.2 darwin-x64 node-v12.2.0

USAGE
  $ ntest [COMMAND]

COMMANDS
  help  display help for ntest
  init  Initial nodejs test collection
  new   Initial nodejs test collection
```

## Test Collection Structure

```sh
.
├── jest.config.js
├── package.json
└── units
    └── add
        ├── __test__
        │   └── index.spec.js
        └── index.js
```

## Run Test

```sh
jest
```

See `package.json` `scripts`.

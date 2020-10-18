# node-test-cli

Create node js/ts unit tests.

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

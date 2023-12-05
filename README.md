# jste-cli

[![NPM Version](https://img.shields.io/npm/v/jste-cli.svg)](https://www.npmjs.com/package/jste-cli)
[![Node.js CI](https://github.com/aristov/jste-cli/actions/workflows/node.js.yml/badge.svg)](https://github.com/aristov/jste-cli/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/aristov/jste-cli/badge.svg?branch=main)](https://coveralls.io/github/aristov/jste-cli?branch=main)
[![NPM](https://img.shields.io/npm/l/jste-cli)](https://raw.githubusercontent.com/aristov/jste-cli/main/LICENSE)

This tool converts static HTML markup into a [JSTE](https://github.com/aristov/jste) template.

## Installation

```shell
npm install jste-cli -g
```

## Usage

Create an ESM-compatible template (default):

```shell
jste --input=./page.html --output=./page.js
```

Create a CommonJS-compatible template:

```shell
jste --input=./page.html --output=./page.jste --type=cjs
```

## License

[The MIT License (MIT)](https://raw.githubusercontent.com/aristov/jste-cli/main/LICENSE)

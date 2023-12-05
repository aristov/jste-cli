# jste-cli

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

[The MIT License (MIT)](https://raw.githubusercontent.com/aristov/jste-cli/master/LICENSE)

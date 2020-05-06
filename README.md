# ecma-version-validator-webpack-plugin
[![npm version](https://badge.fury.io/js/ecma-version-validator-webpack-plugin.svg)](https://badge.fury.io/js/ecma-version-validator-webpack-plugin)
[![](https://github.com/koba04/ecma-version-validator-webpack-plugin/workflows/test/badge.svg)](https://github.com/koba04/ecma-version-validator-webpack-plugin/actions?workflow=test)
[![](https://github.com/koba04/ecma-version-validator-webpack-plugin/workflows/lint/badge.svg)](https://github.com/koba04/ecma-version-validator-webpack-plugin/actions?workflow=lint)

A wepback plugin to verify ECMAScript version for bundle files.

This plugin is intended to verify that bundle files don't include unsupported syntaxes, so I encourage to enable this only on a production build.

## Install

```
% npm install --save-dev ecma-version-validator-webpack-plugin
```

## How to use

Add a `ECMAVersionValidatorPlugin` instance into a `plugins` field in `webpack.config.js`

- `webpack.config.js`

```js
const { ECMAVersionValidatorPlugin } = require("ecma-version-validator-webpack-plugin");

module.exports = {
    // ...
    plugins: [
      new ECMAVersionValidatorPlugin(/* options */)
    ],
}
```

## Options

### constructor

- `options.ecmaVersion`
    - This is a target ECMAScript version you expect. See the avaiable versions in the [Acorn's documentation](https://github.com/acornjs/acorn/tree/master/acorn#interface). The default version is `5`(ES5).

## LICENCE

- [LICENSE](./LICENSE)
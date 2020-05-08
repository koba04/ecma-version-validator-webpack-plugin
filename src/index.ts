import { Compiler, Plugin } from "webpack";
import { validate, ECMAVersion } from "./validate";

export class ECMAVersionValidatorPlugin implements Plugin {
  name: string;
  ecmaVersion: ECMAVersion;
  test: RegExp;
  constructor(options: { ecmaVersion?: ECMAVersion; test?: RegExp } = {}) {
    const { ecmaVersion, test } = options;
    this.name = "ECMAVersionValidator";
    this.ecmaVersion = ecmaVersion ?? 5;
    this.test = test || /\.(m)?js$/;
  }
  apply(compiler: Compiler) {
    compiler.hooks.emit.tap(this.name, (compilation) => {
      validate(compilation.assets, {
        ecmaVersion: this.ecmaVersion,
        test: this.test,
      });
    });
  }
}

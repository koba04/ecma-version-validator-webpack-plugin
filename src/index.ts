import { Compiler, WebpackPluginInstance } from "webpack";
import { validate, ECMAVersion } from "./validate";

export class ECMAVersionValidatorPlugin implements WebpackPluginInstance {
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
      try {
        validate(compilation.assets, {
          ecmaVersion: this.ecmaVersion,
          test: this.test,
        });
      } catch (e: any) {
        compilation.errors.push(e);
      }
    });
  }
}

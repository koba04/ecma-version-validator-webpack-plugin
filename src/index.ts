import { Compiler, Plugin } from "webpack";
import { validate, ECMAVersion } from "./validate";

export class ECMAVersionValidatorPlugin implements Plugin {
  name: string;
  ecmaVersion: ECMAVersion;
  constructor(options: { ecmaVersion: ECMAVersion } = { ecmaVersion: 5 }) {
    this.name = "ECMAVersionValidator";
    this.ecmaVersion = options.ecmaVersion;
  }
  apply(compiler: Compiler) {
    compiler.hooks.emit.tap(this.name, (compilation) => {
      validate(compilation.assets, { ecmaVersion: this.ecmaVersion });
    });
  }
}

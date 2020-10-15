import path from "path";
import webpack from "webpack";
import { fs } from "memfs";

import { ECMAVersionValidatorPlugin } from "../";

describe("ECMAVersionValidatorPlugin", () => {
  describe("constructor", () => {
    const ecmaVersion = 2020;
    const test = /\.js/;
    it("should set values passed with constructor", () => {
      const plugin = new ECMAVersionValidatorPlugin({ ecmaVersion, test });
      expect(plugin.ecmaVersion).toBe(ecmaVersion);
      expect(plugin.test).toBe(test);
      expect(plugin.name).toBe("ECMAVersionValidator");
    });
    it("should set default values if you don't pass options to the constructor", () => {
      const plugin = new ECMAVersionValidatorPlugin();
      expect(plugin.ecmaVersion).toBe(5);
      expect(plugin.test.toString()).toBe(/\.(m)?js$/.toString());
    });
    it("should set default values if you don't pass ecmaVersion", () => {
      const plugin = new ECMAVersionValidatorPlugin({ test });
      expect(plugin.ecmaVersion).toBe(5);
      expect(plugin.test).toBe(test);
    });
    it("should set default values if you don't pass test value", () => {
      const plugin = new ECMAVersionValidatorPlugin({ ecmaVersion });
      expect(plugin.ecmaVersion).toBe(ecmaVersion);
      expect(plugin.test.toString()).toBe(/\.(m)?js$/.toString());
    });
  });
  describe("apply", () => {
    it("should not emit any error if an input file is valid", (done) => {
      const compiler = webpack({
        mode: "development",
        entry: path.resolve(__dirname, "fixtures", "es5.js"),
        devtool: "nosources-source-map",
        plugins: [new ECMAVersionValidatorPlugin()],
      });
      // @ts-ignore https://github.com/webpack/webpack/pull/9251
      compiler.outputFileSystem = fs;
      compiler.run((err, stats) => {
        expect(err).toBeNull();
        if (typeof stats === "undefined") {
          throw new Error("An unexpected error: stats is undefined");
        }
        expect(stats.compilation.errors.length).toBe(0);
        done();
      });
    });
    it("should emit an error if an input file is not valid", (done) => {
      const compiler = webpack({
        mode: "development",
        entry: path.resolve(__dirname, "fixtures", "es2015.js"),
        devtool: "nosources-source-map",
        plugins: [new ECMAVersionValidatorPlugin()],
      });
      // @ts-ignore https://github.com/webpack/webpack/pull/9251
      compiler.outputFileSystem = fs;
      compiler.run((err, stats) => {
        expect(err).toBeNull();
        if (typeof stats === "undefined") {
          throw new Error("An unexpected error: stats is undefined");
        }
        expect(stats.compilation.errors.length).toBe(1);
        done();
      });
    });
  });
});

import { RawSource, ConcatSource } from "webpack-sources";
import { validate } from "../validate";

describe("validate", () => {
  describe("success", () => {
    it("should not thrown any error if input sources are valid", () => {
      expect(() => {
        validate(
          {
            "foo.js": new RawSource("console.log(123);"),
            "bar.js": new RawSource("var bar = 123"),
          },
          { ecmaVersion: 5, test: /\.js/ }
        );
      }).not.toThrow();
    });
    it("should not throw any error if input sources are valid with a passed ecma version", () => {
      expect(() => {
        validate(
          {
            "foo.js": new RawSource("const foo = () => console.log(123);"),
            "bar.js": new RawSource("class Bar {}"),
          },
          { ecmaVersion: 2015, test: /\.js/ }
        );
      }).not.toThrow();
    });
    it("should not throw any error even if a source is ConcatSource", () => {
      expect(() => {
        validate(
          {
            "foo.js": new ConcatSource(
              new RawSource("function foo() { console.log(123); }")
            ),
          },
          { ecmaVersion: 5, test: /\.js/ }
        );
      }).not.toThrow();
    });
    it("should ignore non JS files", () => {
      expect(() => {
        validate(
          {
            "foo.js": new RawSource("function foo() { console.log(123); }"),
            "bar.css": new RawSource(".bar { font-size: 1rem; }"),
          },
          { ecmaVersion: 5, test: /\.js/ }
        );
      }).not.toThrow();
    });
  });
  describe("failed", () => {
    it("should throw an error includes all files having any error", () => {
      expect(() => {
        validate(
          {
            "foo.js": new RawSource(
              "var foo = 1;\nvar foo = () => console.log(123);"
            ),
            "bar.js": new RawSource("var bar = 1;\nclass Bar {}"),
            "baz.js": new RawSource("var baz = true"),
          },
          { ecmaVersion: 5, test: /\.js/ }
        );
      }).toThrowErrorMatchingSnapshot();
    });
    it("should throw an error if a source is ConcatSource", () => {
      expect(() => {
        validate(
          {
            "foo.js": new ConcatSource(
              new RawSource("var foo = 1;\nvar foo = () => console.log(123);")
            ),
          },
          { ecmaVersion: 5, test: /\.js/ }
        );
      }).toThrowErrorMatchingSnapshot();
    });
  });
});

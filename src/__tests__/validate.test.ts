import { validate } from "../validate";

describe("validate", () => {
  describe("success", () => {
    it("should not thrown any error if input sources are valid", () => {
      expect(() => {
        validate(
          {
            "foo.js": { _value: "console.log(123);" },
            "bar.js": { _value: "var bar = 123" },
          },
          { ecmaVersion: 5 }
        );
      }).not.toThrow();
    });
    it("should not throw any error if input sources are valid with a passed ecma version", () => {
      expect(() => {
        validate(
          {
            "foo.js": { _value: "const foo = () => console.log(123);" },
            "bar.js": { _value: "class Bar {}" },
          },
          { ecmaVersion: 2015 }
        );
      }).not.toThrow();
    });
  });
  describe("failed", () => {
    it("should throw an error includes all files having any error", () => {
      expect(() => {
        validate(
          {
            "foo.js": {
              _value: "var foo = 1;\nvar foo = () => console.log(123);",
            },
            "bar.js": { _value: "var bar = 1;\nclass Bar {}" },
            "baz.js": { _value: "var baz = true" },
          },
          { ecmaVersion: 5 }
        );
      }).toThrowErrorMatchingSnapshot();
    });
  });
});

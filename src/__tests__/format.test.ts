import { format } from "../format";
import { ErrorMap } from "../validate";

jest.mock("path");

describe("format", () => {
  it("should return a formatted message", () => {
    const errorMap: ErrorMap = new Map();
    errorMap.set("foo.js", {
      message: "const is a reverved word",
      source: "var a = true;\nconst foo = () => {}",
      position: {
        line: 2,
        column: 0,
      },
    });
    expect(format(errorMap)).toMatchSnapshot();
  });
  it("should return a formatted message if position is null", () => {
    const errorMap: ErrorMap = new Map();
    errorMap.set("foo.js", {
      message: "const is a reverved word",
      source: "var a = true;\nconst foo = () => {}",
      position: null,
    });
    expect(format(errorMap)).toMatchSnapshot();
  });
  it("should omit a source code if the error line is over 100 characters", () => {
    const errorMap: ErrorMap = new Map();
    errorMap.set("foo.js", {
      message: "const is a reverved word",
      source: `var ${"a".repeat(100)} = () => {}; // ${"b".repeat(200)}`,
      position: {
        line: 1,
        column: 110,
      },
    });
    expect(format(errorMap)).toMatchSnapshot();
  });
});

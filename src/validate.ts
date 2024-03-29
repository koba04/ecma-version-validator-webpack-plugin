import { parse, defaultOptions } from "acorn";
import { sources } from "webpack";
import { format } from "./format";

export type ECMAVersion = typeof defaultOptions.ecmaVersion;

export type ErrorMap = Map<
  string,
  {
    message: string;
    source: string;
    position: {
      line: number;
      column: number;
    } | null;
  }
>;
export const validate = (
  assets: { [file: string]: sources.Source },
  options: { ecmaVersion: ECMAVersion; test: RegExp }
) => {
  const { ecmaVersion, test } = options;
  const errors: ErrorMap = new Map();
  Object.entries(assets)
    .filter(([file]) => test.test(file))
    .forEach(([file, source]) => {
      const sourceCode = source.source().toString();
      try {
        parse(sourceCode, { ecmaVersion });
      } catch (e: any) {
        errors.set(file, {
          message: e.message,
          source: sourceCode,
          position: e.loc,
        });
      }
    });
  if (errors.size > 0) {
    throw new Error(
      `${format(
        errors
      )}\nECMAVersionValidatorPlugin has detected incompatible syntax with ES${ecmaVersion}.\n\n`
    );
  }
};

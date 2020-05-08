import { Source } from "webpack-sources";
import { parse, defaultOptions } from "acorn";
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
  assets: { [file: string]: Source },
  options: { ecmaVersion: ECMAVersion }
) => {
  const { ecmaVersion } = options;
  const errors: ErrorMap = new Map();
  Object.entries(assets).forEach(([file, source]) => {
    const sourceCode = source.source();
    try {
      parse(sourceCode, { ecmaVersion });
    } catch (e) {
      errors.set(file, {
        message: e.message,
        source: sourceCode,
        position: e.loc,
      });
    }
  });
  if (errors.size > 0) {
    throw new Error(format(errors));
  }
};

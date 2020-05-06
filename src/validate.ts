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
  assets: { [file: string]: { _value: string } },
  options: { ecmaVersion: ECMAVersion }
) => {
  const { ecmaVersion } = options;
  const errors: ErrorMap = new Map();
  Object.entries(assets).forEach(([file, source]) => {
    try {
      parse(source._value, { ecmaVersion });
    } catch (e) {
      const message = e.toString();
      const match = message.match(/.*?\((\d+):(\d+)\)$/);
      const position = match ? { line: +match[1], column: +match[2] } : null;
      errors.set(file, { message, source: source._value, position });
    }
  });
  if (errors.size > 0) {
    throw new Error(format(errors));
  }
};

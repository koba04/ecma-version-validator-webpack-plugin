import path from "path";
import { ErrorMap } from "./validate";

export const format = (errors: ErrorMap): string => {
  let message = "";
  errors.forEach((v, k) => {
    message += `${path.resolve(k)}\n`;
    let sourceIndents = 4;
    if (v.position) {
      const loc = `  ${v.position.line}:${v.position.column}`;
      message += loc;
      sourceIndents = loc.length + 2;
    }
    message += `  ${v.message}\n`;
    if (v.position) {
      message += `${" ".repeat(sourceIndents)}${extractSource(
        v.source,
        v.position
      )}\n`;
    }
  });
  return message;
};

const extractSource = (
  source: string,
  position: { line: number; column: number }
) => {
  const offset = 40;
  const sourceLine = source.split("\n")[position.line - 1];
  if (sourceLine.length < 100) {
    return sourceLine;
  }
  return sourceLine.substring(
    position.column - offset,
    position.column + offset
  );
};

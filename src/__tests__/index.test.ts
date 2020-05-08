import { ECMAVersionValidatorPlugin } from "../";

describe("ECMAVersionValidatorPlugin", () => {
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

const TerserPlugin = require("terser-webpack-plugin");
const { ECMAVersionValidatorPlugin } = require("../../lib/");

module.exports = {
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [new ECMAVersionValidatorPlugin()],
};

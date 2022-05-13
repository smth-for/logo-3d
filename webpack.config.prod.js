const path = require("path");
const OptimizeThreePlugin = require('@vxna/optimize-three-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  watch: false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new OptimizeThreePlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin()
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};

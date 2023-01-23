const path = require("path");
const dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js", // Your input file
  output: {
    filename: "main.js", // Your output filename
    path: path.resolve(__dirname, "./public/assets"), // Output file path
    publicPath: "/assets/", // Folder where all Webpack generated code will go
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        enforce: "pre",
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["source-map-loader", "style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  devtool: "source-map",

  devServer: {
    port: process.env.PORT || 7000, // Check for provided port, default = 7000
    static: path.resolve(__dirname, "./public"), // Folder that has your index.html file
    devMiddleware: {
      publicPath: "/assets/", // Folder where all Webpack generated code will go
    },
  },
  plugins: [new dotenv()],
};

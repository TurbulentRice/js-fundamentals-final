const path = require("path");

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
        loader: "babel-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["source-map-loader","style-loader", "css-loader", "sass-loader"]
      }
    ]
  },

  devtool: "source-map",

  devServer: {
    port: 7000,
    publicPath: "/assets/", // Folder where all Webpack generated code will go
    contentBase: path.resolve(__dirname, "./public"), // Folder that has your index.html file
    watchContentBase: true // Makes it so the browser will refresh when you make changes to the index.html file too
  }
};
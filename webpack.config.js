module.exports = {
  entry: ["./origin.js", "./origin2.js"],
  output: {
    path: __dirname,
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};

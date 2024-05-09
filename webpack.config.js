module.exports = {
  entry: "./origin.js",
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

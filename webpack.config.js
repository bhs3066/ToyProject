module.exports = {
  entry: ["./origin.js"],
  output: {
    path: __dirname,
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 모든 js파일에 대해
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

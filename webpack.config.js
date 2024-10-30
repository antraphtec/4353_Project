const path = require("path");

module.exports = {
  entry: "./src/index.js", // Replace with your main JavaScript file path
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
      os: require.resolve("os-browserify/browser"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // Use presets if you're using modern JavaScript or React
          },
        },
      },
    ],
  },
};

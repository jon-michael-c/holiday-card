const path = require("path");

module.exports = {
  // Define the entry point of your application
  entry: "./src/index.js",

  // Define the output directory and filenames
  output: {
    filename: "./js/index.js",
    path: path.resolve(__dirname, "dist"),
  },

  // Define how different file types should be treated
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // Add more loaders here for other file types (e.g., images, fonts)
    ],
  },

  // Add plugins if needed
  plugins: [],

  // Enable source maps for debugging
  devtool: "source-map",
};

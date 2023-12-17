const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  // Define the entry point of your application
  entry: "./src/index.js",

  output: {
    filename: "./js/index.js",
    path: path.resolve(__dirname, "dist"),
  },

  // Define how different file types should be treated
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          "css-loader", // Translates CSS into CommonJS
          "resolve-url-loader", // Resolves URLs in CSS
          {
            loader: "sass-loader",
            options: {
              sourceMap: true, // Required for resolve-url-loader to work properly
            },
          },
        ],
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],

  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // Minify CSS
      new TerserPlugin(), // Minify JavaScript
    ],
  },

  // Enable source maps for debugging
  devtool: "source-map",
};

 
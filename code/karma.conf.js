var path = require("path");
var testHelperPath = path.resolve("tests/main/testHelper.js");

module.exports = function(config) {
  config.set({
    browsers: ["PhantomJS"],
    frameworks: ["jasmine"],
    files: [testHelperPath],

    preprocessors: {
      [testHelperPath]: ["webpack", "sourcemap"]
    },

    webpack: {
      devtool: "inline-source-map",

      externals: {
        cheerio: "window",
        "react/addons": true,
        "react/lib/ExecutionEnvironment": true,
        "react/lib/ReactContext": true
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          },
          {
            test: /\.(html)$/,
            use: {
              loader: "html-loader",
              options: {
                attrs: [":data-src"]
              }
            }
          }
        ]
      },
      resolve: {
        modules: ["./src", "node_modules"]
      }
    }
  });
};

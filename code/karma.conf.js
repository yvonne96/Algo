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

    // webpack configuration used by karma-webpack
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
            exclude: [/\.js$/, /\.(html)$/],
            loader: "file",
            query: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          },
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
      // relative path starts out at the src folder when importing modules
      resolve: {
        modules: ["./src", "node_modules"]
      }
    },

    webpackMiddleware: {
      // only output webpack error messages
      stats: "errors-only"
    }
  });
};

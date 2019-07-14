const config = require("./config");
const baseConf = require("./webpack.base.conf");
const merge = require("webpack-merge");
const utils = require("./utils");
const HOST = process.env.HOST || config.dev.host;
const PORT = process.env.PORT || config.dev.port;
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder');
const nodeNotifier = require("node-notifier");

const webpackConf = merge(baseConf, {
  mode: "development",
  output: {
    path: utils.resolveDir("dist"),
    filename: "scripts/[name].js",
    chunkFilename: "scripts/[id].js",
    publicPath: config.dev.assetsPublicPath
  },
  devServer: {
    historyApiFallback: true,
    port: PORT,
    host: HOST,
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    },
    open: false,
    publicPath: config.dev.assetsPublicPath
  },
  devtool: config.dev.devtool,
  /* plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ] */
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = PORT;
  portfinder
    .getPortPromise()
    .then(port => {
      process.env.port = port;
      webpackConf.devServer.port = port;
      webpackConf.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${HOST}:${port}`
            ]
          },
          onErrors: (severity, errors) => {
            if (severity !== "error") {
              return;
            }
            const error = errors[0];
            nodeNotifier.notify({
              title: "Webpack error",
              message: severity + ": " + error.name,
              subtitle: error.file || ""
            });
          }
        })
      );
      resolve(webpackConf)
    })
    .catch(err => {
      reject(err);
    });
});

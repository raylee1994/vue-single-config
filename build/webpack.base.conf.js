const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const utils = require("./utils");
const vueLoaderConf = require("./vue-loader.conf");

module.exports = {
  entry: {
    app: utils.resolveDir("src/main.js")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConf
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|gif|svg|jpe?g)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "images/[name].[hash:8].[ext]"
        }
      },
      ...utils.resloveStyles({
        less: {}
      })
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": utils.resolveDir("src"),
      views: utils.resolveDir("src/views")
    },
    extensions: [".js", ".json", ".vue"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: utils.resolveDir("index.html")
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from: utils.resolveDir("static"),
        to: "static"
      }
    ])
  ],
  optimization: {
    namedModules: true, // 选择是否给module更有意义的名称 (true会显示路径,false直接采用索引)
    namedChunks: true, // 选择是否给chunk更有意义的名称 (true会显示路径,false直接采用索引)
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: "vendor",
          priority: 10
        }
      }
    }
  }
};

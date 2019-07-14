const config = require("./config");
const baseConf = require("./webpack.base.conf");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const utils = require("./utils");
const webpack = require("webpack")
const merge = require("webpack-merge");

module.exports = merge(baseConf, {
    mode: "production",
    output: {
        path: utils.resolveDir("dist"),
        filename: "scripts/[name].[chunkhash:8].js",
        chunkFilename: "scripts/[name].[chunkhash:8].js",
        publicPath: config.build.assetsPublicPath
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
        }),
        new webpack.NamedChunksPlugin(), // 根据文件名来稳定你的chunkid
        new webpack.HashedModuleIdsPlugin(), //生成稳定ModuleId,新增模块后,其他模块的构建后的文件Hash没有变化，提高缓存命中率
    ],
    devtool: config.build.devtool
})
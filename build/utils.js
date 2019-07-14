const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const packageConfig = require('../package.json')

exports.resolveDir = function(dir) {
  return path.join(__dirname, "..", dir);
};

exports.resloveStyles = function(exts) {
  let rules = [];
  const isdev = process.env.NODE_ENV == "development";
  const cssRule = {
    loader: "css-loader",
    options: {
      sourceMap: true,
      // minimize: !isdev
    }
  };
  const postCssRule = {
    loader: "postcss-loader",
    options: {
      sourceMap: true
    }
  };

  let loaders = [cssRule, postCssRule];
  if (!isdev) {
    loaders.unshift(MiniCssExtractPlugin.loader);
  }else {
    loaders.unshift("vue-style-loader");
  }

  rules.push({
    test: /\.css$/,
    use: loaders
  });

  for (let ext in exts) {
    let loaders = [cssRule, postCssRule];
    if (!isdev) {
      loaders.unshift(MiniCssExtractPlugin.loader);
    }else {
      loaders.unshift("vue-style-loader");
    }
    let options = Object.assign(exts[ext], {
      sourceMap: true
    })
    loaders.push({
      loader: ext + "-loader",
      options: options
    })
    rules.push({
      test: new RegExp('\\.' + ext + '$'),
      use: loaders
    });
  }

  return rules;
};


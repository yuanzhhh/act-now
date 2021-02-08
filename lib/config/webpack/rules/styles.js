"use strict";
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { STATUS: { __PROD__ } } = require('../../infoConf');
const plugins = [
    'postcss-flexbugs-fixes',
];
const lessUse = [{
        loader: 'css-loader',
        options: {
            importLoaders: 1,
        },
    }, {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins,
            }
        },
    }, {
        loader: 'less-loader',
    }];
const less = {
    test: /\.less$/,
    use: (__PROD__ ? [MiniCssExtractPlugin.loader] : [{
            loader: 'style-loader',
        }]).concat(lessUse),
};
const css = {
    test: /\.css$/,
    use: (__PROD__ ? [MiniCssExtractPlugin.loader] : [{
            loader: 'style-loader',
        }]).concat([
        'css-loader',
    ]),
};
module.exports = [
    less,
    css,
];
//# sourceMappingURL=styles.js.map
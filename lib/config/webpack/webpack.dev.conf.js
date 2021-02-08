"use strict";
const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const { PATH } = require('../infoConf');
module.exports = {
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
    },
    mode: 'development',
    devtool: 'cheap-module-source-map',
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        }
    },
    entry: {
        index: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            PATH.entryIndex,
        ],
    },
    output: {
        path: PATH.dist,
        filename: 'static/[name].js',
        chunkFilename: 'assets/[chunkhash:8].bundle.js',
        publicPath: '/',
    },
    optimization: {
        moduleIds: 'named',
    },
    plugins: [
        new NyanProgressPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                enabled: true,
                memoryLimit: 4096,
                configFile: path.join(PATH.root, 'tsconfig.json'),
            },
            async: true,
        }),
        new ForkTsCheckerNotifierWebpackPlugin({
            excludeWarnings: true,
            skipSuccessful: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(PATH.src, '/public/index.html'),
            inject: true,
        }),
        new AddAssetHtmlPlugin({
            filepath: path.join(PATH.dll, 'vendor.dll.bundle.js'),
            hash: true,
            includeSourcemap: false,
        }),
        new webpack.DllReferencePlugin({
            manifest: path.join(PATH.dll, 'manifest.json'),
            context: PATH.dll,
        }),
    ],
};
//# sourceMappingURL=webpack.dev.conf.js.map
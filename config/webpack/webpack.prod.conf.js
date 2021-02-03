const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const getCDNPath = require('@cofe/jss-deploy').getCDNPath;
// const ESBuildPlugin = require('esbuild-webpack-plugin').default;
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const infoConf = require('../infoConf');

const CDNPath = '//' + getCDNPath(undefined, true) + '/';

module.exports = {
    mode: 'production',
    entry: {
        index: [
            infoConf.PATH.entryIndex,
        ],
    },
    output: {
        path: infoConf.PATH.dist,
        filename: `static/js/[name].[chunkhash:8].js`,
        chunkFilename: `static/js/[chunkhash:8].chunk.js`,
        publicPath: CDNPath,
        assetModuleFilename: 'static/media/[hash][ext][query]'
    },
    optimization: {
        moduleIds: 'deterministic',
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
            },
        },
        minimize: true,
        minimizer: [
            // new ESBuildPlugin(),
            new TerserPlugin({
                parallel: true,
            }),
            new CssMinimizerPlugin({
                parallel: true,
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(infoConf.PATH.src, '/public/index.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: `static/css/index.[chunkhash:8].css`,
            chunkFilename: `static/css/[id].[chunkhash:8].css`,
            ignoreOrder: false,
        }),
        new CompressionPlugin(),
    ]
}

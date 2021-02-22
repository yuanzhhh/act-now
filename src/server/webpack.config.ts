const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const threadLoader = require('thread-loader');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const osSize = require('os').cpus().length;
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const ESBuildPlugin = require('esbuild-webpack-plugin').default;
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

import babelrc from './babelrc';
import * as paths from '../paths';

interface ConfigOptions {
  env: 'development' | 'production';
  entryPath: string | undefined;
}

export default ({ env, entryPath }: ConfigOptions) => {
  const isDevelopment = env === 'development';
  const isProduction = env === 'production';

  const babelOpts = babelrc({ isDevelopment });
  const entryIndex = entryPath ? paths.resolveAppPath(entryPath) : paths.appIndex;

  const threadLoaderOpts = {
    workers: isProduction ? osSize : osSize - 1,
    workerParallelJobs: 50,
    workerNodeArgs: ['--max-old-space-size=1024'],
    poolRespawn: false,
    poolTimeout: isProduction ? 500 : Infinity,
    poolParallelJobs: 50,
    name: "tsx-pool",
  };

  threadLoader.warmup(threadLoaderOpts, [
    'babel-loader',
    'ts-loader',
    'css-loader',
    'less-loader',
    'style-loader',
    'postcss-loader',
  ]);

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: 'cheap-module-source-map',
    entry: isDevelopment ? [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      entryIndex,
    ] : entryIndex,
    output: {
      path: paths.resolveAppPath('dist'),
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].bundle.js',
      publicPath: '/',
      assetModuleFilename: isProduction ?
        'static/media/[hash][ext][query]' : undefined,
    },
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
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
      minimize: isProduction,
      minimizer: [
        // new ESBuildPlugin(),
        new TerserPlugin({
          parallel: true,
        }),
        new CssMinimizerPlugin({
          cache: true,
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
    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.json',
        '.ts',
        '.tsx',
      ],
      alias: {
        ...(isProduction && {
          'react-dom': '@hot-loader/react-dom',
        }),
        '@': paths.resolveAppPath('src')
      },
      modules: [paths.resolveAppPath('src'), paths.resolveAppPath('node_modules')],
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          // switch case
          oneOf: [
            {
              test: [/\.(ts|tsx)$/],
              use: [
                {
                  loader: "thread-loader",
                  options: threadLoaderOpts,
                },
                {
                  loader: 'babel-loader',
                  options: babelOpts,
                },
                {
                  loader: 'ts-loader',
                  options: {
                    transpileOnly: isDevelopment,
                    happyPackMode: true,
                    ignoreDiagnostics: [],
                  },
                },
              ],
              include: paths.resolveAppPath('src'),
              exclude: paths.resolveAppPath('node_modules'),
            },
            {
              test: [/\.(js|jsx)$/],
              use: {
                loader: 'babel-loader?cacheDirectory=true',
                options: babelOpts,
              },
              include: paths.resolveAppPath('src'),
              exclude: paths.resolveAppPath('node_modules'),
            },
            {
              test: /\.less$/,
              use: (
                isProduction ? [MiniCssExtractPlugin.loader] : [{
                  loader: 'style-loader',
                }]
              ).concat([{
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
              }, {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      'postcss-flexbugs-fixes',
                    ],
                  }
                },
              }, {
                loader: 'less-loader',
              }]),
            },
            {
              test: /\.css$/,
              use: (
                isProduction ?
                  [MiniCssExtractPlugin.loader] : [{
                    loader: 'style-loader',
                  }]
              ).concat(['css-loader']),
            },
            {
              test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
              type: 'asset/resource',
            },
            {
              test: /\.(woff|woff2|eot|ttf|otf|svg|)$/i,
              type: 'asset/resource',
            },
          ]
        }
      ],
    },
    plugins: [
      new ProgressBarPlugin(),
      new NyanProgressPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new CleanWebpackPlugin(),
      new webpack.IgnorePlugin(/\.\/locale/, /moment/),
      isProduction && new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: paths.resolveAppPath('src/public/index.html'),
        inject: true,
        ...(
          isProduction ? {
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
            }
          } : {}
        )
      }),
      isDevelopment && new ReactRefreshWebpackPlugin(),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      isDevelopment && new FriendlyErrorsWebpackPlugin(),
      isDevelopment && new CaseSensitivePathsPlugin(),
      isDevelopment && new ForkTsCheckerWebpackPlugin({
        typescript: {
          enabled: true,
          memoryLimit: 4096,
          configFile: paths.resolveAppPath('tsconfig.json'),
        },
        async: true,
      }),
      isDevelopment && new ForkTsCheckerNotifierWebpackPlugin({
        excludeWarnings: true,
        skipSuccessful: true,
      }),
      isProduction && new MiniCssExtractPlugin({
        filename: `static/css/[name].[contenthash:8].css`,
        chunkFilename: `static/css/[name].[contenthash:8].css`,
        ignoreOrder: false,
      }),
    ].filter(item => item),
  };
};

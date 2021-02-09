const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
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

const appPath = fs.realpathSync(process.cwd());
const resolveAppPath = (resolveName: string) =>
  path.resolve(appPath, resolveName);

const appPackage = require(resolveAppPath('package.json'));
const appIndex = resolveAppPath(appPackage.main);

interface ConfigOptions {
  env: 'development' | 'production'
}

export default ({ env }: ConfigOptions) => {
  const isDevelopment = env === 'development';
  const isProduction = env === 'production';

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
      appIndex,
    ] : appIndex,
    output: {
      path: isProduction ? resolveAppPath('dist') : undefined,
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/[chunkhas8].bundle.js',
      publicPath: '/',
      assetModuleFilename: isProduction ?
        'static/media/[hash][ext][query]' : undefined,
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
        'src': resolveAppPath('src')
      },
      modules: ['node_modules', resolveAppPath('node_modules')],
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
                  options: Object.assign(
                    {
                      cacheDirectory: true,
                      babelrc: false,
                      plugins: [
                        isDevelopment && require.resolve('react-refresh/babel')
                      ]
                    },
                    path.resolve(__dirname, './babelrc')
                  ),
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
              include: resolveAppPath('src'),
              exclude: resolveAppPath('node_modules'),
            },
            {
              test: [/\.(js|jsx)$/],
              use: {
                loader: 'babel-loader?cacheDirectory=true',
                options: Object.assign(
                  {
                    cacheDirectory: true,
                    babelrc: false,
                  },
                  path.resolve(__dirname, './babelrc')
                ),
              },
              include: resolveAppPath('src'),
              exclude: resolveAppPath('node_modules'),
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
              use: isProduction ?
                [MiniCssExtractPlugin.loader, 'css-loader'] : [{
                  loader: 'style-loader',
                }],
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
      new NyanProgressPlugin(),
      new webpack.ProgressPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new CleanWebpackPlugin(),
      new webpack.IgnorePlugin(/\.\/locale/, /moment/),
      isProduction && new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': isProduction ? 'development' : 'production'
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: resolveAppPath('/public/index.html'),
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
          configFile: resolveAppPath('tsconfig.json'),
        },
        async: true,
      }),
      isDevelopment && new ForkTsCheckerNotifierWebpackPlugin({
        excludeWarnings: true,
        skipSuccessful: true,
      }),
      isProduction && new MiniCssExtractPlugin({
        filename: `static/css/index.[chunkhash:8].css`,
        chunkFilename: `static/css/[id].[chunkhash:8].css`,
        ignoreOrder: false,
      }),
    ],
  };
};

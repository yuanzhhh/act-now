const webpack = require('webpack');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const infoConf = require('../infoConf');
const packageJson = require(path.join(infoConf.PATH.root, 'package.json'));

module.exports = {
    name: 'vendor',
    entry: Object.keys(packageJson.dependencies),
    output: {
        path: infoConf.PATH.dll,
        filename: 'vendor.dll.bundle.js',
        library: 'library_[hash]',
    },
    mode: 'development',
    resolve: {
        fallback: {
            fs: false,
            module: false
        }
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.DllPlugin({
            name: 'library_[hash]',
            path: path.join(infoConf.PATH.dll, 'manifest.json'),
        })
    ]
};

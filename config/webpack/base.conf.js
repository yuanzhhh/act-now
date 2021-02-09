const webpack = require('webpack');

const rules = require('./rules');
const infoConf = require('../infoConf');

const { PATH } = infoConf;

module.exports = {
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.ts',
            '.tsx',
        ],

        alias: {
            "@": '/Users/jryuanentai/work/jtalk/laboratory/fe-jtalk-client-im/src'
        },

        modules: ['/Users/jryuanentai/work/jtalk/laboratory/fe-jtalk-client-im/src', 'node_modules'],
    },
    module: { rules },
    plugins: [
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(infoConf.STATUS.__ENV__),
        }),
    ]
};

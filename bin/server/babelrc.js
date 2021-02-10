"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ isDevelopment }) => ({
    cacheDirectory: true,
    babelrc: false,
    presets: [
        [
            '@babel/preset-env', {
                targets: {
                    browsers: ['ios >= 8', 'android >= 4.0'],
                },
                modules: false,
            },
        ],
        [
            '@babel/preset-react', {
                runtime: 'automatic',
                development: isDevelopment,
                importSource: '@welldone-software/why-did-you-render',
            }
        ],
    ],
    plugins: [
        "syntax-dynamic-import",
        "dynamic-import-webpack",
        "@babel/plugin-proposal-class-properties",
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        'react-hot-loader/babel',
        ['import', { libraryName: 'antd-mobile', style: 'css' }],
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: false,
            },
        ],
        isDevelopment && require.resolve('react-refresh/babel')
    ].filter(item => item),
});
//# sourceMappingURL=babelrc.js.map
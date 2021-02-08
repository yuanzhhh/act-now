"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = require("webpack");
const rules_1 = require("./rules");
const infoConf_1 = require("../infoConf");
const { PATH } = infoConf_1.default;
const awd = {
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.ts',
            '.tsx',
            '.css',
            '.less',
        ],
        alias: {
            "@": PATH.src,
        },
        modules: [PATH.src, 'node_modules'],
    },
    module: { rules: rules_1.default },
    plugins: [
        new webpack_1.default.IgnorePlugin(/\.\/locale/, /moment/),
        new webpack_1.default.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(infoConf_1.default.STATUS.__ENV__),
        }),
    ]
};
exports.default = awd;
//# sourceMappingURL=base.conf.js.map
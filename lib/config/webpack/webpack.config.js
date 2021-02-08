"use strict";
const { merge } = require('webpack-merge');
const __DEV__ = require('../infoConf').STATUS.__DEV__;
const base = require('./base.conf');
module.exports = merge(base, __DEV__ ? require('./webpack.dev.conf') : require('./webpack.prod.conf'));
//# sourceMappingURL=webpack.config.js.map
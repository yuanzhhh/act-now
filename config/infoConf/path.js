const path = require('path');

const root = '/Users/jryuanentai/work/jtalk/laboratory/fe-jtalk-client-im/';

module.exports = {
  root,
  dist: path.join(root, 'dist'),
  src: path.join(root, 'src'),
  dll: path.join(root, 'dll'),
  entryIndex: path.join(root, 'src/index.tsx'),
}

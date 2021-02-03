const path = require('path');

const root = path.resolve(__dirname, '../../');

module.exports = {
  root,
  dist: path.join(root, 'dist'),
  src: path.join(root, 'src'),
  dll: path.join(root, 'dll'),
  entryIndex: path.join(root, 'src/index.tsx'),
}

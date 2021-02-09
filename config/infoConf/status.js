const env = process.env;

const __DEV__ = true;
const __PROD__ = false;
const __ENV__ = env.NODE_ENV;

module.exports = {
  __DEV__,
  __PROD__,
  __ENV__,
}

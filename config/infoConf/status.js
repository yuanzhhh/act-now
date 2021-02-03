const env = process.env;

const __DEV__ = (env.NODE_ENV === 'development');
const __PROD__ = (env.NODE_ENV === 'production');
const __ENV__ = env.NODE_ENV;

module.exports = {
  __DEV__,
  __PROD__,
  __ENV__,
}

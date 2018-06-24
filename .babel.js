const modules = process.env.NODE_ENV === 'test' ? 'commonjs' : false;

module.exports = {
  presets: [['env', { modules }], 'react'],
  plugins: [
    ['babel-plugin-root-import', { rootPathSuffix: 'src' }],
    'transform-object-rest-spread',
    'transform-class-properties',
  ],
};

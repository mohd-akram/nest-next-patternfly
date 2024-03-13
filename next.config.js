module.exports = {
  transpilePackages: [
    '@patternfly/react-core',
    '@patternfly/react-styles',
    '@patternfly/react-table',
  ],
  experimental: {
    extensionAlias: { '.js': ['.ts', '.tsx', '.js', '.jsx'] },
  },
};

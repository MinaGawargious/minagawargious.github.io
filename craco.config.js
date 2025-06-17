module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.json$/,
            type: 'json',
          },
        ],
      },
    },
  },
}; 
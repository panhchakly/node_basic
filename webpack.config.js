const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development', // Change to 'production' for production mode
  entry: './src/index.js', // Entry point of your Node.js application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },
  target: 'node', // Indicates that the bundle will be used in a Node.js environment
  devtool: 'inline-source-map',
  externals: [nodeExternals({
    allowlist: ['client-logger']
  })],
  module: {
    exprContextRegExp: /$^/,
    exprContextCritical: false,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    fullySpecified: false, // disable the behaviour of webpack trying to guess file types
    extensions: ['.js'],
    alias: {
      "@models": path.resolve(__dirname, "src/models"),
      "@controllers": path.resolve(__dirname, "src/controllers"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@middlewares": path.resolve(__dirname, "src/middlewares"),
      "@config": path.resolve(__dirname, "src/config")
    },
    fallback: {
      "mongodb-client-encryption": false ,
      "aws4": false,
      "socks": false,
      "snappy": false,
      "gcp-metadata": false,
      "@aws-sdk/credential-providers": false,
      "@mongodb-js/zstd": false,
      "kerberos": false,
      "pg-hstore": false
    }
  }
};

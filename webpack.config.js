module.exports = {
  // Example setup for your project:
  // The entry module that requires or imports the rest of your project.
  // Must start with `./`!
  entry: './src/entry.js',
  
  resolve: {
    symlinks: false,
    extensions: ['.js', '.json', '.ts'],
  },
  // Place output files in `./dist/my-app.js`
  output: {
    path: __dirname + '/dist',
    filename: 'node-serverless-lab.js'
  },
  externals: [
    'aws-sdk'
  ],
  module: {
    rules: [
      {
        test: /\.json$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'json-loader'
      }
    ]
  }
};
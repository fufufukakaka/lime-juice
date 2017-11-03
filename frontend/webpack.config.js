const webpack = require('webpack');

module.exports = {
  context: __dirname + "/src",
  stats: {colors: true},
  entry: {
   jsx: "./index.js"
  },
  output: {
    path: __dirname + "/python-server/static/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
    configFile: './.eslintrc'
  }
      }
    })
  ],
module: {
    rules: [
     { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "eslint-loader",enforce:"pre"},
    { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'file?name=[name].[ext]' ,enforce:'post'},
      { test: /\.(woff|woff2|ttf|eot)$/, loader: 'file?name=[name].[ext]'  ,enforce:'post'},
      { test: /\.html$/, loader: "file?name=[name].[ext]"  ,enforce:'post'},
      {
      test: /\.css$/,
      use: [
          'style-loader',
          'css-loader'
      ]},
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: [
        {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {'modules': false}]
              ]
            }
          }
      ],enforce:'post'}
    ],
    loaders: [{
            test: /\.js$/,
            loaders: ['react-hot-loader/webpack', 'babel']
        }]
  },
  node: {
    fs: "empty"
  },
  devServer: {
    contentBase: "./src",
    hot: true,
    proxy: {
      '/limejuice': {
        target: 'http://0.0.0.0:5000',
        secure: false
      }
    }
}
};

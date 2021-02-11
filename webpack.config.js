const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "src"),
  target: "web",
  entry: './index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'js/main.js'
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: path.resolve(__dirname, 'src','index.html'),
      filename: 'index.html'
    }),
    //new MiniCssExtractPlugin()
    new MiniCssExtractPlugin({
      filename: 'style/[name].css',
      chunkFilename: '[id].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        },
        //type: 'asset/resource',
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader:  MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) =>{
                return path.relative(path.dirname(resourcePath), context) + '/';
              }
            }
          },
          'css-loader',
          'sass-loader'
        ],
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    compress: true,
    hot: true
  }
};

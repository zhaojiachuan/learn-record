const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = (relative) => path.resolve(__dirname, relative);
module.exports = {
  entry:path.join(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js',
    chunkFilename: '[name]_[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
     {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
      resolve: {
        alias: {
               react: 'react/umd/react.development.js',
    'react-dom': 'react-dom/umd/react-dom.development.js',
            '@common': path.resolve(__dirname, 'src/common'),
            '@components': path.resolve(__dirname, 'src/component'),
            api: path.resolve(__dirname, './src/api'),
            '@actions': resolve('./src/actions'),
            Page: resolve('./src/Page'),
            '@': path.resolve(__dirname, './src'),
            '@src': resolve('./src')
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        mainFields: ['main']
    },
  plugins:[
       new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html'),
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
  ],
  mode: 'development',
  devServer: {
    static: path.join(__dirname,'./dist'),
    port: 3000
  }
};

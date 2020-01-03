'use strict';

/**
 * Default dev server configuration.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');

class WebpackDevConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      devtool: 'cheap-module-source-map',
      devServer: {
        contentBase: ['./public/', './src/'],
        publicPath: '/dist/assets/',
        disableHostCheck: true,
        host: "0.0.0.0",
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8002,
        proxy: {
          "/api/**": {
            /*target: "http://api.servistesinapp.com"*/
            target : "http://localhost:8088",
            changeOrigin: true,
            secure: false
          }
        }
      },
      entry: [
        'webpack-dev-server/client?http://0.0.0.0/',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './client.js',
      ],
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
        })
      ]
    };

    this.config.module.rules = this.config.module.rules.concat([
      {
        test: /^.((?!cssmodule).)*\.(sass|scss)$/,
        loaders: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          { loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }, {
        test: /^.((?!cssmodule).)*\.less$/,
        use: [
          {loader: "style-loader"},
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }, {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      }
    ])

    // console.log(this.config.module.rules);
  }
}

module.exports = WebpackDevConfig;

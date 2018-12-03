const path = require('path');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

// https://github.com/webpack-contrib/uglifyjs-webpack-plugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// https://github.com/jantimon/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
// https://github.com/webpack-contrib/extract-text-webpack-plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// https://github.com/webpack-contrib/purifycss-webpack
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');
// https://github.com/johnagan/clean-webpack-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin');

const SRC = path.resolve(__dirname, 'src');
const ENTRY = path.resolve(SRC, 'main.tsx');
const DIST = path.resolve(__dirname, 'dist');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['syntax-dynamic-import'],
            presets: [['env', { modules: false }]]
          }
        },
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: 'file-loader',
            outputPath: 'fonts/'
          }
        }
      }
    ]
  },

  entry: [ENTRY],
  output: {
    filename: '[name].[hash].js',
    path: DIST
  },
  mode: 'development',

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new CleanWebpackPlugin(DIST),
    new HtmlWebpackPlugin({
      template: path.resolve(SRC, 'index.html')
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    // Make sure this is after ExtractTextPlugin!
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: [
        path.resolve(SRC, 'index.html'),
        ...glob.sync(path.resolve(SRC, '**', '*.tsx')),
        './node_modules/react-jsonschema-form/dist/react-jsonschema-form.js'
      ],
      minimize: true,
      verbose: true,
      purifyOptions: {
        whitelist: ['*hk-*', '*nav*', '*tab*', '*fade*', '*popover*', '*modal*']
      }
    })
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },
      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },

  devtool: 'source-map',

  devServer: {
    port: 9000,
    contentBase: DIST,
    publicPath: '/',
    host: '0.0.0.0',
    watchContentBase: true,
    disableHostCheck: true,
    useLocalIp: true
  }
};

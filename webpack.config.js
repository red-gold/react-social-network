var webpack = require('webpack');
var path = require('path');
var envFile = require('node-env-file');


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log(process.env.NODE_ENV);

try {
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {

}

module.exports = {
  entry: [
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: (process.env.NODE_ENV === 'production') ? [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_KEY: JSON.stringify(process.env.API_KEY),
        AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
        STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
        PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
        MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
        HOST_URL: JSON.stringify(process.env.HOST_URL)
      }
    })
  ] : [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          API_KEY: JSON.stringify(process.env.API_KEY),
          AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
          DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
          STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
          PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
          MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
          HOST_URL: JSON.stringify(process.env.HOST_URL)
        }
      })],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',

  },
  resolve: {

    modules: [
      __dirname,
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './app/components'),
      path.resolve(__dirname, './app/layouts'),
      path.resolve(__dirname, './app/api'),
      path.resolve(__dirname, './app/constants'),
      path.resolve(__dirname, './app/actions'),
      path.resolve(__dirname, './app/reducers')




    ],
    alias: {
      app: 'app',
      applicationStyles: 'app/styles/app.scss',
      actions: 'app/actions/actions.jsx',
      actionTypes: 'app/constants/actionTypes.jsx',
      configureStore: 'app/store/configureStore.jsx'

    },
    extensions: [' ', '.scss', '.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ['transform-decorators-legacy'],
          presets: ['react', 'env', 'stage-0']
        }
      }
    },
    {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader",
        options: {
          includePaths: [

          ]
        }
      }]
    },
    {
      test: /\.css$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"

      }]
    },
    {
      test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader'
    }, {
      test: /\.(jpe?g|png|webp|gif|cur)$/,
      loader: 'file-loader?name=/images/[name].[ext]'
    }


    ]
  },
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
};

var webpack = require('webpack');
var path = require('path');
var envFile = require('node-env-file');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log(process.env.NODE_ENV);

try {
    envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {

}
module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src/index.tsx'
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
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: `http://localhost:${process.env.PORT}` }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API_KEY: JSON.stringify(process.env.API_KEY),
                AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
                DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
                STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
                PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
                MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
                HOST_URL: JSON.stringify(process.env.HOST_URL),
                PORT: JSON.stringify(process.env.PORT)
            }
        })
    ],
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, './public'),
        filename: 'bundle-v0.3.js',

    },
    resolve: {

        modules: [
            __dirname,
            path.resolve(__dirname, 'node_modules')
        ],
        alias: {
            src: 'src',
            components: 'src/components',
            reducers: 'src/reducers',
            constants: 'src/constants',
            core: 'src/core',
            data: 'src/data',
            api: 'src/api',
            layouts: 'src/layouts',
            routes: 'src/routes',
            models: 'src/models',
            store: 'src/store',
            applicationStyles: 'src/styles/app.scss',
            actions: 'src/actions',
            actionTypes: 'src/constants/actionTypes.jsx'

        },
        extensions: [' ', '.scss', ".ts", ".tsx", ".js", '.jsx']
    },
    module: {
        rules: [{
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [{
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: { transpileOnly: true }
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.js(x?)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
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
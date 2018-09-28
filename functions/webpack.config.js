'use strict';

var nodeExternals = require('webpack-node-externals');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: __dirname,
        filename: 'index.js',
        libraryTarget: 'this'
    },
    target: 'node',
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
                transpileOnly: true
            }
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    externals: [
        nodeExternals()
    ],
    plugins: [
        new ForkTsCheckerWebpackPlugin()
    ]
};
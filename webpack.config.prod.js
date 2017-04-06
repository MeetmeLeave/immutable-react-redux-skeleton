const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src/index'),
    target: 'web',
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin('styles.css'),
        new webpack
            .optimize
            .UglifyJsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }, {
                test: /(\.css)$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            }, {
                test: /\.(woff|woff2)$/,
                loader: 'url-loader?prefix=font/&limit=5000'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    }
};
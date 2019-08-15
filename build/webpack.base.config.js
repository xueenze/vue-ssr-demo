const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin, } = require('vue-loader');
const autoprefixer = require("autoprefixer");

const isProd = process.env.NODE_ENV === 'production';

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    devtool: isProd
        ? false
        : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js',
    },
    resolve: {
        extensions: [ '.js', '.vue', '.json', ],
        alias: {
            'public': path.resolve(__dirname, '../public'),
            '@': resolve('src'),
        },
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false,
                    },
                    postcss:[
                        require('autoprefixer')({ 
                            browsers: [
                                'last 10 Chrome versions', 
                                'last 5 Firefox versions', 
                                'Safari >= 6', 'ie> 8'
                            ] 
                        })
                    ]
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]',
                },
            },
            {
                test: /\.less$/,
                use: isProd
                    ? ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: { minimize: true, },
                            },
                            'less-loader',
                            'postcss-loader',
                        ],
                        fallback: 'vue-style-loader',
                    })
                    : [ 'vue-style-loader', 'css-loader', 'less-loader', 'postcss-loader', ],
            },
        ],
    },
    performance: {
        hints: false,
    },
    plugins: isProd
        ? [
            new VueLoaderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false, },
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new ExtractTextPlugin({
                filename: 'common.[chunkhash].css',
            }),
        ]
        : [
            new VueLoaderPlugin(),
            new FriendlyErrorsPlugin(),
        ],
};

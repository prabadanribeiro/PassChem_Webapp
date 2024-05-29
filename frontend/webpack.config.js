const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
require('dotenv').config()

module.exports = {

    entry: './src/index.js',

    output: {
        path: path.join(__dirname, 'dist'), 
        filename: 'bundle.js',
        publicPath: '/',
    },

    plugins: [ 
        new HTMLWebpackPlugin({
            template: './public/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_GOOGLE_CLIENT_ID': JSON.stringify(process.env.REACT_APP_GOOGLE_CLIENT_ID),
        }),
    ], 

    module: { 
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    devServer: {
        historyApiFallback: true,
    },
}
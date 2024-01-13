const path = require('path') // Defines path in os
const HTMLWebpackPlugin = require('html-webpack-plugin') // Defines HTMLWebpackPlugin

module.exports = {

    entry: './src/index.js', // Input 

    output: { // Makes destination folder and file for bundle.js
        path: path.join(__dirname, 'dist'), // I remved '/' before dist
        filename: 'bundle.js',
        publicPath: '/',
    },

    plugins: [ // Makes sure index.html is in new dist folder
        new HTMLWebpackPlugin({
            template: './public/index.html',
        })
    ], 

    module: { // Makes sure only index.js is taken in and uses babel-loader for JSX
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
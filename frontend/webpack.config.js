const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {

    entry: './src/index.js', // Input 

    output: { // Makes destination folder and file
        path: path.join(__dirname, '/dist'), 
        filename: 'bundle.js' 
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html',
        })
    ],

    module: { // Makes sure only index.js is taken in
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
            }
        ]
    }
}
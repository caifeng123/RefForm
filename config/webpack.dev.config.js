const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, '../example/src/index.html'),
    filename: './index.html'
});

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, '../example/src/app.tsx'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(jsx?|tsx?)$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/i,
            use: [
                'style-loader',
                'css-loader',
                'less-loader',
            ]
        }]
    },
    plugins: [
        htmlWebpackPlugin
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
    },
    devServer: {
        port: 3001
    }
};


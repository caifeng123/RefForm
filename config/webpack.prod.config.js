const path = require('path');

module.exports = {
    mode: 'production', // 开发模式
    entry: path.join(__dirname, '../src'),
    output: {
        path: path.join(__dirname, '../lib/'),
        filename: 'index.js',
        libraryTarget: 'umd', // 采用通用模块定义
        globalObject: 'this'
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [{
            test: /\.(jsx?|tsx?)$/,
            use: ['babel-loader', {
                loader: 'ts-loader',
                options: {
                    compiler: 'ttypescript'
                }
            }],
            exclude: /node_modules/
        }, {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.less$/i,
            use: [
                'style-loader',
                'css-loader',
                'less-loader',
            ],
        }],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
    },
    externals: {
        react: 'react',
        'react-dom': {
            root: 'reactDom',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        },
        'lodash': {
            commonjs2: 'lodash',
            commonjs: 'lodash',
            amd: 'lodash',
            root: '_'
        },
        'moment': {
            commonjs2: 'moment',
            commonjs: 'moment',
            amd: 'moment',
            root: 'moment'
        },
        'styled-components': {
            commonjs2: 'styled-components',
            commonjs: 'styled-components',
            amd: 'styled-components'
        },
        'rxjs': {
            commonjs2: 'rxjs',
            commonjs: 'rxjs',
            amd: 'rxjs'
        }
    },
};

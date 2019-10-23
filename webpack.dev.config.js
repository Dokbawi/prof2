const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    name : 'development-prof',
    mode : 'development',
    devtool : 'inline-source-map', // hidden-source-map
    resolve :  {
        extensions : ['.js', '.jsx']
    },
    entry: [
        './src/index',
        'webpack-dev-server/client?http://0.0.0.0:3001',
    ],

    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public',
        proxy: {
            "**": "http://localhost:3000"
        }
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
    ],

    output: {
        path: path.join(__dirname + 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [{
                test: /\.jsx?/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [['@babel/preset-env',{
                        targets: {
                            browsers: ['> 1% in KR'], //browsers list
                        },
                    }],'@babel/preset-react'],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        'react-hot-loader/babel',
                    ]
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
};

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    name : 'prof',
    mode : 'production',
    devtool : 'hidden-source-map', // hidden-source-map
    resolve :  {
        extensions : ['.js', '.jsx']
    },
    
    entry: [
        './src/index',
    ],

    output: {
        path: path.join(__dirname + '/public'),
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
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
    ],
};

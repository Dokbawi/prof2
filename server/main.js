// import express from 'express';
// import WebpackDevServer from 'webpack-dev-server';
// import webpack from 'webpack';

const express = require('express');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const app = express();
const port = 3000;
const devPort = 3001;
const path = require('path');


if(process.env.NODE_ENV == 'development') {
    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

app.use('/', express.static(path.resolve(__dirname, '../public')));

app.get('*', (req, res, next) => {
    if(req.path.split('/')[1] === 'static') return next();
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

const server = app.listen(port, () => {
    console.log('Express', port);
});
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const mongoose = require('mongoose');
const request = require('request');
const bodyParser = require('body-parser');
const Category = require('./public/server/models/Category');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
var oldData;
var oldCat;


const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    mongoose.connect(process.env.DB_URL ||  'mongodb://Kasjs:Mantrudevelop1985@ds027338.mlab.com:27338/learn_phrase_app');
    mongoose.connection.on('error', function(err) {
        console.log('Error: Could not connect to MongoDB');
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.use(express.static('./public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', process.env.allowOrigin || 'http://localhost');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.get('/', function(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, './public/dist/index.html')));
        res.end();
    });
    app.get('/category', function(req, res) {
        Category.findOne({}, function(err, data) {
            if(data) {
                res.send({
                    data: data
                });
            } else {
                let category = new Category();
                category.save(function(err) {
                    if(err) {
                        res.send({
                            msg: 'Error'
                        });
                    }
                    Category.findOne({}, function(err, data) {
                        res.send({
                            data: data
                        });
                    });
                });
            }
        });
    });
    app.post('/category', function(req, res) {
        // oldData = req.body.data;
        // oldCat = req.body.category;
        // console.log(oldData, oldCat);
        // Category.remove({}, function(err) {
        //     if(err) {
        //         res.send({
        //             msg: 'Error'
        //         });
        //     }
        // });
        // var other = new Category();
        // other[oldCat] = oldData[req.body.category];
        // other[req.body.category] = req.body.data;
        Category.findOne({}, function(err, data) {
            console.log(data);
            data[req.body.category] = req.body.data;
            data.save(function(err) {
                if(err) {
                    res.send({
                        msg: 'Error'
                    })
                }
            });
            res.send({
                data: data
            });
        });
    });
} else {
    app.use(express.static(__dirname + '/dist'));
    app.get('*', function response(req, res) {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

const path = require('path'),
fs = require('fs'),
express = require('express'),
rewrite = require('express-urlrewrite'),
webpack = require('webpack'),
mongoose = require('mongoose'),
request = require('request'),
bodyParser = require('body-parser'),
Category = require('./public/server/models/Category'),
User = require('./public/server/models/User'),
webpackMiddleware = require('webpack-dev-middleware'),
webpackHotMiddleware = require('webpack-hot-middleware'),
config = require('./webpack.config.js'),
React = require('react'),
Router = require('react-router'),

isDeveloping = process.env.NODE_ENV !== 'production',
port = isDeveloping ? 3000 : process.env.PORT,
app = express();
require('node-jsx').install();

if (isDeveloping) {
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'app',
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

    app.post('/register', function(req, res) {
        User.findOne({ email : req.body.email }, function(err, existingUser) {
            if(existingUser) {
                res.send({
                    user: existingUser,
                    msg: 'User with this email already exist'
                })
            }
        })
        let user = new User();
        user.email = req.body.email;
        user.password = req.body.password;
        user.save(function(err) {
            if(err) {
                res.status(404).json({
                    msg: 'Error'
                })
            }
            res.send({
                user: user
            });
        })
    })


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

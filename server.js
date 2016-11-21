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
        // Category.findOne({}, function(err, data) {
        //     if (data) {
        //         res.send({
        //             data: data
        //         });
        //     } else {
        //         let category = new Category();
        //         category.save(function(err) {
        //             if (err) {
        //                 res.send({
        //                     msg: 'Error'
        //                 });
        //             }
        //             Category.findOne({}, function(err, data) {
        //                 res.send({
        //                     data: data
        //                 });
        //             });
        //         });
        //     }
        // });
        User.findOne({email : req.query.email}, function(err, user) {
            if (user) {
                res.send({
                    data : user.category[0]
                })
            } else {
                res.status(400).json({
                    msg: 'Error not found category'
                })
            }
        })
    });

    // app.get('/user/cat', function(req, res) {
    //     User.findOne({email : req.query.email}, function(err, user) {
    //         if (user) {
    //             res.send({
    //                 data : user.category[0]
    //             })
    //         } else {
    //             res.status(400).json({
    //                 msg: 'Error not found category'
    //             })
    //         }
    //     })
    // });

    app.post('/category', function(req, res) {
        User.findOne({ email: req.body.email }, function(err, user) {
            console.log(req.body.data,'----------------->', user.category[0][req.body.category] );
            user.category[0][req.body.category] = req.body.data;
            user.save(function(err , user) {
                if (err) {
                    res.send({
                        msg: 'Error'
                    })
                }
            });
            res.send({
                data: user.category[0]
            })
            // res.send({
            //     data: user.category[0]
            // })
        })


        // Category.findOne({}, function(err, data) {
        //     console.log(data);
        //     data[req.body.category] = req.body.data;
        //     data.save(function(err) {
        //         if (err) {
        //             res.send({
        //                 msg: 'Error'
        //             })
        //         }
        //     });
        //     res.send({
        //         data: data
        //     });
        // });
    });

    app.post('/register', function(req, res) {
        User.findOne({ email : req.body.email }, function(err, existingUser) {
            if (existingUser) {
                return res.status(400).json({
                    msg: 'User with this email already exist'
                })
            }
            let user = new User();
            user.email = req.body.email;
            user.password = req.body.password;
            user.category = {
                Food : [{
                    "side_a": "яблуко",
                    "side_b": "apple",
                    "hits": 0
                },
                {
                    "side_a": "апельсин",
                    "side_b": "orange",
                    "hits": 0
                },
                {
                    "side_a": "хліб",
                    "side_b": "bread",
                    "hits": 0
                },
                {
                    "side_a": "молоко",
                    "side_b": "milk",
                    "hits": 0
                },
                {
                    "side_a": "вода",
                    "side_b": "water",
                    "hits": 0
                },
                {
                    "side_a": "сік",
                    "side_b": "juice",
                    "hits": 0
                },
                {
                    "side_a": "тістечко",
                    "side_b": "cake",
                    "hits": 0
                }],
                Nature: [{
                    "side_a": "небо",
                    "side_b": "sky",
                    "hits": 0
                },
                {
                    "side_a": "місяць",
                    "side_b": "moon",
                    "hits": 0
                },
                {
                    "side_a": "земля",
                    "side_b": "earth",
                    "hits": 0
                },
                {
                    "side_a": "ліс",
                    "side_b": "forest",
                    "hits": 0
                },
                {
                    "side_a": "океан",
                    "side_b": "ocean",
                    "hits": 0
                },
                {
                    "side_a": "річка",
                    "side_b": "river",
                    "hits": 0
                },
                {
                    "side_a": "листок",
                    "side_b": "leaf",
                    "hits": 0
                },
                {
                    "side_a": "зима",
                    "side_b": "winter",
                    "hits": 0
                },
                {
                    "side_a": "осінь",
                    "side_b": "spring",
                    "hits": 0
                },
                {
                    "side_a": "лід",
                    "side_b": "ice",
                    "hits": 0
                },
                {
                    "side_a": "жара",
                    "side_b": "hot",
                    "hits": 0
                }],
                Sport: [{
                    "side_a": "бігти",
                    "side_b": "run",
                    "hits": 0
                },
                {
                    "side_a": "ходити",
                    "side_b": "walk",
                    "hits": 0
                },
                {
                    "side_a": "м'яч",
                    "side_b": "ball",
                    "hits": 0
                },
                {
                    "side_a": "лук",
                    "side_b": "bow",
                    "hits": 0
                },
                {
                    "side_a": "стріла",
                    "side_b": "arrow",
                    "hits": 0
                },
                {
                    "side_a": "стрибати",
                    "side_b": "jump",
                    "hits": 0
                },
                {
                    "side_a": "плавати",
                    "side_b": "sweam",
                    "hits": 0
                },
                {
                    "side_a": "футбол",
                    "side_b": "football",
                    "hits": 0
                },
                {
                    "side_a": "гольф",
                    "side_b": "golf",
                    "hits": 0
                }]
            }
            user.save(function(err) {
                if (err) {
                    res.status(404).json({
                        msg: 'Error'
                    })
                }
                return res.send({
                    user: user
                });
            })
        })
    })

    app.post('/login', function(req, res) {
        User.findOne({ email : req.body.email }, function(err, existingUser) {
            if (!existingUser) {
                return res.status(400).json({
                    msg: 'User with this email not found'
                })
            }

            if (existingUser.password === req.body.password) {
                return res.send({
                    user: existingUser
                })
            } else {
                res.status(400).json({
                    msg: 'You enter incorrect password or email'
                })
            }
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

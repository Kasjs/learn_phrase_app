const path = require('path'),
fs = require('fs'),
express = require('express'),
rewrite = require('express-urlrewrite'),
webpack = require('webpack'),
mongoose = require('mongoose'),
favicon = require('serve-favicon'),
passport = require('passport'),
request = require('request'),
bodyParser = require('body-parser'),
webpackMiddleware = require('webpack-dev-middleware'),
webpackHotMiddleware = require('webpack-hot-middleware'),
webpackConfig = require('./webpack.production.config.js'),
config = require('./config'),
React = require('react'),
Router = require('react-router'),

isProduction = process.env.NODE_ENV !== 'developing',
port = isProduction ? 3000 : process.env.PORT,
app = express();
app.use(passport.initialize());

require('node-jsx').install();
require('./server/models/User');
require('./server/models/Category');
require('./server/passport')(config);
const routes = require('./server/routes/index');
const authCheckMiddleware = require('./server/middlewares/auth-check')(config);

if (isProduction) {
    const compiler = webpack(webpackConfig);
    const middleware = webpackMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
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

    mongoose.connect(process.env.DB_URL || config.db);
    mongoose.connection.on('error', function(err) {
        console.log('Error: Could not connect to MongoDB');
    });

    app.use(favicon(path.join(__dirname, 'server', 'assets', 'images', 'favicon.ico')));
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.use(express.static('./public'));
    app.use(express.static('./server'));
    app.use(express.static('./dist'));
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
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, './dist/index.html')));
        res.end();
    });
    app.use('/', routes);
}

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

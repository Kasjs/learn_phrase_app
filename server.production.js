const path = require('path'),
fs = require('fs'),
express = require('express'),
rewrite = require('express-urlrewrite'),
webpack = require('webpack'),
mongoose = require('mongoose'),
passport = require('passport'),
request = require('request'),
bodyParser = require('body-parser'),
React = require('react'),
Router = require('react-router'),
config = require('./config'),
port = 3000,
app = express();
app.use(passport.initialize());

require('node-jsx').install();
require('./server/models/User');
require('./server/models/Category');
require('./server/passport')(config);
const routes = require('./server/routes/index');
const authCheckMiddleware = require('./server/middlewares/auth-check')(config);


app.use(express.static(__dirname + '/public'));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'public/dist/index.html'));
});
mongoose.connect(process.env.DB_URL || config.db);
mongoose.connection.on('error', function(err) {
    console.log('Error: Could not connect to MongoDB');
});

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

// app.get("/cache.manifest", function(req, res){
//     res.header("Content-Type", "text/cache-manifest");
//     res.end("CACHE MANIFEST");
// });
// app.get('/', function(req, res) {
//     res.write(middleware.fileSystem.readFileSync(path.join(__dirname, './public/dist/index.html')));
//     res.end();
// });
//app.use('/', authCheckMiddleware);
app.use('/', routes);


app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var serveStatic = require('serve-static');
var serve = serveStatic('public');
var minimist = require('minimist');
var argv = minimist(process.argv);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// robado de la clase 9 not-twitter - MODIFICADO
var server = http.createServer(function(req, res) {

//     if (req.url === '/postularme') {
//         if (req.method === 'GET') {
//             tweets = [];
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             });

// // por cada user en users, si es distinto a req.headers.user,
// // entonces recorrer su array de tweets ->
// // por cada tweet, preguntar si su propiedad timestamp es mayor
// // a req.headers.timestamp, si lo es entonces agregar el tweet
// // en cuestión al array tweets

//             var usersKeys = Object.keys(users);
//             for (var i = 0; i < usersKeys.length; i++) {
//                 if (usersKeys[i] !== req.headers.user) {
//                     // console.log(usersKeys[i], users[usersKeys[i]]);
//                     var tweetsArr = users[usersKeys[i]];
//                     for (var m = 0; m < tweetsArr.length; m++) {
//                         if (tweetsArr[m].timestamp > req.headers.timestamp) {
//                             tweets.push(tweetsArr[m]);
//                         }
//                     };
//                 }
//             };
//             console.log('total:', users);
//             console.log('respondo:', tweets, req.headers.timestamp);
//             // responder el contenido de tweets transformado a string
//             res.end(JSON.stringify(tweets));

//             return;
//         }
//     }


    // var tweet;

    if (req.url === '/postularme') {
        if (req.method === 'POST') {
            // tweet = '';
            req.setEncoding('utf8');

            req.on('data', function(data) {
                tweet += data;
            });

            req.on('end', function() {
                tweet = JSON.parse(tweet);
                tweet.timestamp = req.headers.timestamp;
                tweet.user = {
                    name: req.headers.user
                };
                if (users[req.headers.user]) {
                    users[req.headers.user].push(tweet);
                } else {
                    users[req.headers.user] = [tweet];
                }

                res.writeHead(200);
                res.end('{}');
            });
            return;
        }
    }

    // parte dónde sirvo contenido estático
    serve(req, res, function() {
        res.end();
    });
});


module.exports = app;

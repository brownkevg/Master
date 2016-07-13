var express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	router = express.Router(),
	path = require('path'),
	http = require('http');
	passport = require('passport'),
	session = require('express-session');

var config = require('./config');

var app = express();

require('./passportConfig')(passport);

app.use(session({secret: 'secret',
				resave: true,
				saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

app.set('port', 4000);
app.set('view engine', 'jade');

app.use('/javascripts',express.static(path.join(__dirname,'public/javascripts')));
app.use('/stylesheets',express.static(path.join(__dirname,'public/stylesheets')));
app.use('/images',express.static(path.join(__dirname,'public/images')));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(router);
require('./main/routes')(app, passport);


dbClient = null;

http.createServer(app).listen(app.get('port'), function(){
	console.log("Listening on port " + app.get('port'));
});
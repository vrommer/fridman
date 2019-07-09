const express = require('express');
const path = require('path');
// var favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const api = require('./routes/api');

const globals = require('./globals');
const DataService = require('./services/dataService').DataService;

const app = express();

let dataService = new DataService();

dataService.seedDb();
app.locals.basePath = path.join(__dirname, 'public');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('prod'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(globals.publicPath));

app.use('/api', api);

app.get('*', function(req, res){
	res.sendfile(__dirname + '/public/index.html');
});

module.exports = app;

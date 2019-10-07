const express = require('express');
const path = require('path');
// var favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const request = require('request');

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
	let data = {
		recepients: ["vadim.rommer@gmail.com"],
		subject: "Fridman's Gallery",
		message: "The gallery just had a visitor!"
	};
	request.post({
			url: 'http://174.138.105.248/notifications',
			json: true,
			body: data
		},
		function(error, response, user){
			if (error) return console.error('Error sending notification');
			console.log("Status code: %s", response.statusCode);
		}
	);

	res.sendFile(__dirname + '/public/index.html');
});

module.exports = app;

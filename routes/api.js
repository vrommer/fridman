const express = require('express');
const fs = require('fs');
const path = require('path');
// const sizeOf = require('image-size');
const assert = require('assert');
const globals = require('../globals');
const DataService = require('../services/dataService').DataService;
// import { DataService } from "../services/dataService";
const request = require('request');

const dataService = new DataService();

const router = express.Router();
let notified = false;

/* GET api general */
router.get('/', function (req, res, next) {
	let param = req.query.param;
	dataService.getItems({
			imageType: param,
			page: 0
		})
		.then((data) => {
			res.jsonp(data)
		})
		.catch(
			(err) => {
				res.status(404).jsonp(err);
			}
		);
});

router.get('/:type/', function (req, res, next) {
	if (!notified) {
		notified = true;
		setTimeout(() => { notified = false }, 30000);
			data = {
				recepients: ["vadim.rommer@gmail.com"],
				subject: "Fridman's Gallery",
				message: `The gallery just had the visitor!`
			};
		request.post({
				url: 'http://174.138.105.248/notifications',
				json: true,
				body: data
			},
			function(error, response, user){
				if (error) return console.error('Error sending notification');
				console.log("Status code: %s", response.statusCode);
				next();
			}
		);
	} else {
		next();
	}
});

router.get('/:type/', function (req, res) {
	dataService.getItems({
		imageType: req.params.type
	})
	.then(data => {
		res.jsonp(data.docs);
	})
	.catch(err => {
		res.status(404).jsonp(err);
	});
});

router.get('/:type/page/:id', function (req, res) {
	dataService.getItems({
		imageType: req.params.type,
		id: req.params.id
	})
	.then(data => {
		res.jsonp(data.docs);
	})
	.catch(err => {
		res.status(404).jsonp(err);
	});
});

router.get('/:type/:item', function (req, res) {
	dataService.getItems({
		imageType: req.params.type,
		imageName: req.params.item
	})
	.then(data => {
		res.jsonp(data.docs);
	})
	.catch(err => {
		res.status(404).jsonp(err);
	});
});

module.exports = router;

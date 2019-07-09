const express = require('express');
const fs = require('fs');
const path = require('path');
// const sizeOf = require('image-size');
const assert = require('assert');
const globals = require('../globals');
const DataService = require('../services/dataService').DataService;
// import { DataService } from "../services/dataService";

const dataService = new DataService();

const router = express.Router();

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

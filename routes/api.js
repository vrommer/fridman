const express = require('express');
const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const assert = require('assert');
const globals = require('../globals');
const DataService = require('../services/dataService').DataService;
// import { DataService } from "../services/dataService";

const dataService = new DataService();

const router = express.Router();

let supportedFolders = ['calligraphy', 'drawings', 'sculptures'];

let imageModel = function (name, type, dimensions) {
	return {
		'name': name,
		'type': type,
		'dimensions': dimensions
	}
};

let service = {
	readDir: function (dirname) {
		return new Promise((resolve, reject) => {
			fs.readdir(dirname, (err, items) => {
				if (err) {
					reject(err);
				} else {
					resolve(items);
				}
			});
		});
	},

	/**
	 * Get an array of items of type 'type'.
	 * if item !== null then item should be first in the array.
	 * The original order of the array should be preserved.
	 * @param type: string
	 * @param item: string
	 * @returns {Promise}
	 */
	getItems: function (type, item) {
		return new Promise((resolve, reject) => {
			let aPathParts = ['assets', 'images', type];
			if (!supportedFolders.includes(type)) {
				reject({error: 'Not found.'});
			}
			else {
				let target = path.join(__dirname, '..', 'angular-src', 'src', ...aPathParts);
				let aReturnData = [];
				this.readDir(target)
					.then((data) => {
						if (item) {
							let index = data.indexOf(item);
							let start = data.slice(index, data.length);
							let end = data.slice(0, index);
							data = [...start, ...end];
						}
						for (let item of data) {
							let full_path = path.join(target, item);
							let dimensions = sizeOf(full_path);
							aReturnData.push(new imageModel(item, type, dimensions));
						}
						resolve(aReturnData);
					}).catch(reject);
			}
		});
	},

	/**
	 *
	 * @param type
	 * @returns {Promise<[{
	 *     type: string,
	 *     dirName: string,
	 *     names: string[]
	 * }, ...]>}
	 */
	getImageNames: function (type) {
		let target = path.join(__dirname, '..', 'images', type);
		return new Promise((resolve, reject) => {
			fs.readdir(target, (err, items) => {
				if (err) reject(err);
				else {
					let results = {
						"type": type,
						"dirName": target,
						"names": items
					};
					resolve(results);
				}
			});
		});
	},

	/**
	 *
	 * @param oInput = {
	 *    type: string,
	 *    dirName: string,
	 *    names: aString
	 * }
	 * @returns {Promise.<{ImageModel[]}>}
	 */
	getImages: function (oInput) {
		let promises = [];
		for (let name of oInput.names) {
			let promise = encodeImageToBase64({
				"name": name,
				"dirName": oInput.dirName,
				"type": oInput.type
			});
			promises.push(promise);
		}
		/**
		 * @param oInput = {
		 *     name: string,
		 *     dirName: string,
		 *     type: string
		 * }
		 * @returns {Promise<ImageModel>}
		 */
		function encodeImageToBase64(oInput) {
			return new Promise((resolve, reject) => {
				let filePath = path.join(oInput.dirName, oInput.name);
				fs.readFile(filePath, function (err, data) {
					if (err) reject(err);
					// Encode to base64
					let base64Data = new Buffer(data, 'binary').toString('base64');
					let dimensions = sizeOf(filePath);
					resolve(new ImageModel(oInput.name, oInput.type, dimensions, base64Data));
				});
			})
		}

		return Promise.all(promises);
	}
};

/* GET api general */
router.get('/', function (req, res, next) {
	let param = req.query.param;
	dataService.getItems(param)
		.then((data) => {
			res.jsonp(data)
		})
		.catch(
			(err) => {
				res.status(404).jsonp(err);
			}
		);
});

router.get('/:type', function (req, res) {
	dataService.getItems(req.params.type)
		.then(data => {
			res.jsonp(data);
		})
		.catch(err => {
			res.status(404).jsonp(err);
		});
});

router.get('/:type/:item', function (req, res) {
	dataService.getItems(req.params.type, req.params.item)
		.then(data => {
			res.jsonp(data);
		})
		.catch(err => {
			res.status(404).jsonp(err);
		});
});

module.exports = router;

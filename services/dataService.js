/**
 * Created by i306534 on 28/04/2019.
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const globals = require('../globals');
const lineReader = require('readline');
const ImageModel = require('../model/ImageModel');

const supportedFolders = ['calligraphy', 'drawings', 'sculptures'];

// let credentials = {};
//
// let lineReader = require('readline').createInterface({
// 	input: fs.createReadStream('db.properties')
// });
//
// lineReader.on('line', function (line) {
// 	lineParts = line.split('=');
// 	if (lineParts && lineParts.length === 2) credentials[lineParts[0]] = lineParts[1];
// });
//
// lineReader.on('close', () => {
// 	let connStr = `mongodb+srv://${credentials.username}:${credentials.password}@${credentials.dburl}/fridman?retryWrites=true`;
// 	connectToDb(connStr);
// });
//
// function connectToDb(connStr) {
// 	MongoClient.connect(connStr, {useNewUrlParser: true}, function (err, client) {
// 		assert.equal(err, null);
// 		const collection = client.db("fridman").collection("devices");
// 		console.log("Connection established!");
// 		// perform actions on the collection object
// 		client.close();
// 	});
// }


class DataService {

	constructor() {
		this.credentials = {};
		this.lr = lineReader.createInterface({
			input: fs.createReadStream('db.properties')
		});
		this.connectionString = "";
	}

	setUpConnectionString() {
		return new Promise((resolve, reject) => {
			try {
				this.lr.on('line', function (line) {
					lineParts = line.split('=');
					if (lineParts && lineParts.length === 2) this.credentials[lineParts[0]] = lineParts[1];
				});
				this.lr.on('close', () => {
					this.connectionString = `mongodb+srv://${credentials.username}:${credentials.password}@${credentials.dburl}/fridman?retryWrites=true`;
					resolve(this.connectionString);
					// connectToDb(connStr);
				});
			} catch (ex) {
				reject(ex);
			}
		});
	}

	connectToDb() {
		return new Promise((resolve, reject) => {
			MongoClient.connect(this.connectionString, {useNewUrlParser: true}, function (err, client) {
				try {
					assert.equal(err, null);
				} catch (ex) {
					reject(ex);
				}
				resolve(client);
			});
		});
		// MongoClient.connect(this.connectionString, {useNewUrlParser: true}, function (err, client) {
		// 	assert.equal(err, null);
		// 	const collection = client.db("fridman").collection("devices");
		// 	console.log("Connection established!");
		// 	// perform actions on the collection object
		// 	client.close();
		// });
	}

	readDir(dirname) {
		return new Promise((resolve, reject) => {
			fs.readdir(dirname, (err, items) => {
				if (err) {
					reject(err);
				} else {
					resolve(items);
				}
			});
		});
	}

	/**
	 * Get an array of items of type 'type'.
	 * if item !== null then item should be first in the array.
	 * The original order of the array should be preserved.
	 * @param type: string
	 * @param item: string
	 * @returns {Promise}
	 */
	getItems(type, item) {
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
							aReturnData.push(new ImageModel(item, type, dimensions));
						}
						resolve(aReturnData);
					}).catch(reject);
			}
		});
	}

	/**
	 *
	 * @param type
	 * @returns {Promise<[{
	 *     type: string,
	 *     dirName: string,
	 *     names: string[]
	 * }, ...]>}
	 */
	getImageNames(type) {
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
	}

	/**
	 *
	 * @param oInput = {
	 *    type: string,
	 *    dirName: string,
	 *    names: aString
	 * }
	 * @returns {Promise.<{ImageModel[]}>}
	 */
	getImages(oInput) {
		let promises = [];
		for (let name of oInput.names) {
			let promise = encodeImageToBase64({
				"name": name,
				"dirName": oInput.dirName,
				"type": oInput.type
			});
			promises.push(promise);
		}
		return Promise.all(promises);
	}

	/**
	 *
	 * @param oInput = {
	 *     name: string,
	 *     dirName: string,
	 *     type: string
	 * }
	 * @returns {Promise<ImageModel>}
	 */
	encodeImageToBase64(oInput) {
		return new Promise((resolve, reject) => {
			let filePath = path.join(oInput.dirName, oInput.name);
			fs.readFile(filePath, function (err, data) {
				if (err) reject(err);
				// Encode to base64
				let base64Data = new Buffer(data, 'binary').toString('base64');
				let dimensions = sizeOf(filePath);
				resolve(new ImageModel(oInput.name, oInput.type, dimensions, base64Data));
			});
		});
	}

	seedDb() {

	}
}

module.exports = {
	"DataService": DataService
};

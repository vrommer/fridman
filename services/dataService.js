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
const ObjectId = require('mongodb').ObjectID;

const environment = "DEV"; /* "DEV" | "PROD" */
const imagesPathsMap = new Map([
	["DEV", ['..', 'angular-src', 'src', 'assets', 'images']],
	["PROD", ['..', 'public', 'assets', 'images']]
]);

const resultsPerPage = 20;

const supportedTypes = ['calligraphy', 'drawings', 'sculptures'];

class DataService {

	constructor() {
		let that = this;
		this.credentials = {};
		this.lr = lineReader.createInterface({
			input: fs.createReadStream('db.properties')
		});
		this.dataCache = new Map([[supportedTypes[0], new Map()],
			[supportedTypes[1], new Map()],
			[supportedTypes[2], new Map()]
		]);
		this.setUpConnectionString()
			.then(connStr => {
				that.connectionString = connStr
			});
	}

	/**
	 *
	 * @returns {Promise}
	 */
	setUpConnectionString() {
		let that = this,
			connectionString;
		return new Promise((resolve, reject) => {
			if (this.connectionString) {
				Promise.resolve(this.connectionString)
					.then(resolve);
			}
			else {
				try {
					this.lr.on('line', function (line) {
						let lineParts = line.split('=');
						if (lineParts && lineParts.length === 2) that.credentials[lineParts[0]] = lineParts[1];
					});
					this.lr.on('close', () => {
						connectionString = `mongodb+srv://${that.credentials.username}:` +
									`${that.credentials.password}@${that.credentials.dburl}/fridman?retryWrites=true`;
						resolve(connectionString);
					});
				} catch (ex) {
					reject(ex);
				}
			}
		});
	}

	/**
	 *
	 * @returns {Promise}
	 */
	connectToDb(connectionString) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(connectionString, {useNewUrlParser: true}, function (err, client) {
				try {
					assert.equal(err, null);
				} catch (ex) {
					reject(ex);
				}
				resolve(client);
			});
		});
	}

	/**
	 * Get an array of items of imageType 'imageType'.
	 * if item !== null then item should be first in the array.
	 * The original order of the array should be preserved.
	 * @param imageType: string
	 * @param item: string
	 * @returns {Promise}
	 */
	getItems(oData) {
		console.log("dataService@getImageType, ", oData);
		oData.dataCache = this.dataCache;
		return this.setUpConnectionString()
			.then(this.connectToDb)
			.then(oClient => this.getFromImagesCollection(oClient, oData))
			.then(this.closeConnection)
			.catch(oData => {
				let err = oData.err,
					oClient = oData.client;
				oClient.close();
				throw err;
			});
	}

	/**
	 * This inner method returns a promise of images.
	 * In order to work correctly the method must be bound to the following:
	 * {
	 *   imageType: string,
	 *   imageName: string,
	 *   dataCache: map
	 * }
	 * dataCache used is this.dataCache.
	 *
	 * The method will fetch the data from database if and cache the data.
	 * If data is already cached the method will use it.
	 * @param oClient
	 * @returns {Promise}
	 */
	getFromImagesCollection(oClient, oData) {
		return new Promise((resolve, reject) => {
			let imageType = oData.imageType,
				imageName = oData.imageName,
				id = oData.id,
				dataCache = this.dataCache,
				db = oClient.db("fridman"),
				imagesCollection = db.collection("images"),
				typeCache = dataCache.get(imageType),
				images = typeCache.get(id),
				filter = {
					"imageType": imageType,
				};
			if (id) {
				filter._id = {$gt: ObjectId(id)};
			}
			// TODO: Use 'limit' for pagination
			// imagesCollection.find({imageType: imageType}).limit(2).toArray(function(err, docs) {
			if (images) {
				let docs = images;
				if (imageName) {
					let index = docs.map(image => image.imageName).indexOf(imageName);
					let start = docs.slice(index, docs.length);
					let end = docs.slice(0, index);
					docs = [...start, ...end];
				}
				resolve({
					docs: docs,
					client: oClient
				});
			}
			else {
				imagesCollection.find(filter).limit(resultsPerPage).toArray(function(err, docs) {
					if (err) {
						// oClient.close();
						reject({
							err: err,
							client: oClient
						});
					}
					else {
						typeCache.set(id, docs);
						if (imageName) {
							let index = docs.map(image => image.imageName).indexOf(imageName);
							let start = docs.slice(index, docs.length);
							let end = docs.slice(0, index);
							docs = [...start, ...end];
						}
						resolve({
							docs: docs,
							client: oClient
						});
						// oClient.close();
					}
				});
			}
		});
	}

	/**
	 *
	 * @param type
	 * @returns {Promise<{
	 *     type: string,
	 *     dirName: string,
	 *     names: string[]
	 * }>}
	 */
	getImageNames(imageType) {
		console.log("dataService@getImageNames");
		let target = path.join(__dirname, ...imagesPathsMap.get(environment), imageType);
		return new Promise((resolve, reject) => {
			fs.readdir(target, (err, items) => {
				if (err) reject(err);
				else {
					let results = {
						"type": imageType,
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
	getImageObjects(oInput) {
		let promises = [];
		for (let name of oInput.names) {
			let promise = this.getImageObject({
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
	getImageObject(oInput) {
		return new Promise((resolve, reject) => {
			let filePath = path.join(oInput.dirName, oInput.name);
			let itemClientPath = ['..', '..', 'assets', 'images', oInput.type, oInput.name].join('/');
			fs.readFile(filePath, function (err, data) {
				if (err) reject(err);
				let dimensions = sizeOf(filePath);
				resolve(new ImageModel(oInput.name, oInput.type, itemClientPath, dimensions, base64Data));
			});
		});
	}

	/**
	 *
	 */
	seedDb() {
		this.setUpConnectionString()
			.then(this.connectToDb)
			// .then(this.dropImagesCollection)
			.then(this.createImagesCollection)
			.then(this.getAllImageNames.bind(this))
			.then(this.getAllImages.bind(this))
			.then(this.seedDbWithImages)
			.then(this.closeConnection)
			.catch(this.handleSeedingError);
	}

	closeConnection(oData) {
		let oClient = oData.client;
		oClient.close();
		return Promise.resolve(oData);
	}

	/**
	 *
	 * @param err
	 */
	handleSeedingError(oData) {
		let err = oData.err,
			oClient = oData.client;
		if (oClient) {
			oClient.close();
		}
		console.log("dataService@handleSeedingError");
		if (err.errmsg === "ns not found") console.log("No images collection - doing nothing");
		else if (err.errmsg) console.log(err.errmsg);
		else console.log(err);
	}

	/**
	 *
	 * @param oData
	 * @returns {Promise}
	 */
	seedDbWithImages(oData) {
		console.log("dataService@insertAllImagesToDb");
		let images = oData.aImages,
			imagesCollection = oData.oImagesCollection,
			oClient = oData.client;
		console.log(images[0]);
		return new Promise((resolve, reject) => {
			imagesCollection.insertMany(images)
				.then(val => resolve({
					result: val,
					oImagesCollection: imagesCollection,
					client: oClient
				})
			)
			.catch(err => {
				reject({
					err: err,
					client: oClient
				})
			});
		});
	}

	/**
	 *
	 * @param imagesCollection
	 * @returns {Promise}
	 */
	getAllImageNames(oData) {
		console.log("dataService@getAllImageNames");
		let	imagesCollection = oData.imagesCollection,
			oClient = oData.client,
			promises = [];
		return new Promise((resolve, reject) => {
			for (let type of supportedTypes) {
				promises.push(this.getImageNames(type))
			}
			Promise.all(promises)
				.then(imageNames => {
					console.log("dataService@getAllImageNames - resolving");
					resolve({
						imageNames: imageNames,
						imagesCollection: imagesCollection,
						client: oClient
					})
				})
				.catch(err => {
					reject({
						err: err,
						client: oClient
					})
				});
		});
	}

	/**
	 *
	 * @param oData
	 * @returns {Promise}
	 */
	getAllImages(oData) {
		let aImageNames = oData.imageNames,
			imagesCollection = oData.imagesCollection,
			oClient = oData.client;
		console.log("dataService@getAllImages");
		let promises = [],
			aAllImages = [];
		for (let imageNames of aImageNames) {
			promises.push(this.getImageObjects(imageNames));
		}
		return new Promise((resolve, reject) => {
			Promise.all(promises)
				.then(aImages => {
					for (let images of aImages) {
						aAllImages  =aAllImages.concat(...images);
					}
					console.log("dataService@getAllImages - resolving");
					resolve({
						aImages: aAllImages,
						oImagesCollection: imagesCollection,
						client: oClient
					});
				})
				.catch(err => {
					reject({
						err: err,
						client: oClient
					})
				});
		});
	}

	/**
	 *
	 * @param oClient
	 * @returns {Promise}
	 */
	dropImagesCollection(oClient) {
		console.log("dataService@dropImagesCollection");
		let db = oClient.db("fridman"),
			imagesCollection = db.collection("images");
		return new Promise((resolve, reject) => {
			imagesCollection.drop()
				.then(() => {
					console.log("dataService@dropImagesCollection - resolving");
					resolve(oClient)
				})
				.catch(reject);
		});
	}

	/**
	 *
	 * @param oClient
	 * @returns {Promise}
	 */
	createImagesCollection(oClient) {
		console.log("dataService@createImagesCollection");
		let options = {
			validator: {
				$jsonSchema: {
					bsonType: "object",
					required: [ "imageName", "imageType", "imageLocation"],
					properties: {
						imageName: {
							bsonType: "string"
						},
						imageType: {
							enum: supportedTypes
						},
						imageLocation: {
							bsonType: "string"
						},
						imageDimensions: {
							bsonType: "object",
							required: [ "height", "width", "type" ],
							properties: {
								height: {
									bsonType: "int"
								},
								width: {
									bsonType: "int"
								},
								type: {
									bsonType: "string"
								}
							}
						}
					}
				}
			}
		};

		let db = oClient.db("fridman"),
			imagesCollection = db.collection("images");
		return new Promise((resolve, reject) => {
			imagesCollection.countDocuments()
				.then(val => {
					if (val === 0) return db.createCollection("images", options);
					else {
						let error = new Error();
						error.errmsg = "Collection already seeded";
						return Promise.reject(error);
					}
				})
				.then(imagesCollection => {
					resolve({
						imagesCollection: imagesCollection,
						client: oClient
					})
				})
				.catch(err => {
					reject({
						err: err,
						client: oClient
					})
				});
		});

	}
}

module.exports = {
	"DataService": DataService
};

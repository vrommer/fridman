const express = require('express');
const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const globals = require('../globals');

var credentials = {};

var lineReader = require('readline').createInterface({
	input: fs.createReadStream('user.properties')
});

lineReader.on('line', function (line) {
  lineParts = line.split('=');
  if (lineParts && lineParts.length === 2) credentials[lineParts[0]] = lineParts[1];
});

lineReader.on('close', () => {
  console.log(credentials);
  let connStr = `mongodb+srv://${credentials.username}:${credentials.password}@${credentials.dburl}/fridman?retryWrites=true`;
  connectToDb(connStr);
});

function connectToDb(connStr) {
	MongoClient.connect(connStr, { useNewUrlParser: true }, function(err, client) {
		assert.equal(err, null);
		const collection = client.db("fridman").collection("devices");
		console.log("Connection established!");
		// perform actions on the collection object
		client.close();
	});
}

const router = express.Router();

let supportedFolders = ['calligraphy', 'drawings', 'sculptures'];

let imageModel = function(name, type, dimensions) {
  return {
    'name': name,
    'type': type,
    'dimensions': dimensions
  }
};

let service = {
  readDir: function(dirname) {
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
  getItems: function(type, item) {
    return new Promise((resolve, reject) => {
      let aPathParts = ['assets', 'images', type];
      if (!supportedFolders.includes(type)){
        reject({ error: 'Not found.' });
      }
      else {
        let target = path.join(__dirname, '..', 'angular-src', 'src',  ...aPathParts);
        let aReturnData = [];
        this.readDir(target)
          .then((data) => {
            if (item){
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
  }
};

/* GET api general */
router.get('/', function(req, res, next) {
  let param = req.query.param;
  service.getItems(param)
    .then((data) => {
      res.jsonp(data)
    })
    .catch(
      (err) => {
        res.status(404).jsonp(err);
      }
    );
});

router.get('/:type', function(req, res) {
  service.getItems(req.params.type)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(404).jsonp(err);
    });
});

router.get('/:type/:item', function(req, res) {
  service.getItems(req.params.type, req.params.item)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(404).jsonp(err);
    });
});

module.exports = router;

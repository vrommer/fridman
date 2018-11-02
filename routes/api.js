var express = require('express');
var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');

var router = express.Router();

var globals = require('../globals');

var supportedFolders = ['calligraphy', 'drawings', 'sculptures'];

var imageModel = function(name, type, dimensions) {
  return {
    'name': name,
    'type': type,
    'dimensions': dimensions
  }
};

var service = {
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

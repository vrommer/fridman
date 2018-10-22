var express = require('express');
var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');

var router = express.Router();

var globals = require('../globals');

var supportedFolders = ['calligraphy', 'drawings', 'sculptures'];

var service = {
  getItemsUrls: function(folder) {
    return new Promise((resolve, reject) => {
      let aPathParts = ['assets', 'images', folder];
      if (!supportedFolders.includes(folder)){
        reject({ error: 'Not found.' });
      }
      else {
        let target = path.join(__dirname, '..', 'angular-src', 'src',  ...aPathParts);
        let clientTarget = path.join(...aPathParts);
        let aUrls = [];
        this.readDir(target)
          .then(items => {
            for (let item of items) {
              var full_path = path.join(target, item);
              var dimensions = sizeOf(full_path);
              console.log(dimensions.width, dimensions.height);
              aUrls.push(path.join(clientTarget, item));
            }
            resolve(aUrls);
          }).catch(reject);
      }
    });
  },
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
  }
};

/* GET api general */
router.get('/', function(req, res, next) {
  let param = req.query.param;
  service.getItemsUrls(param)
    .then((data) => {
      res.jsonp(data)
    })
    .catch(
      (err) => {
        res.status(404).jsonp(err);
      }
    );
});

module.exports = router;

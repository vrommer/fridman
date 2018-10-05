var express = require('express');
var router = express.Router();

var globals = require('../globals');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello express server!');
});

module.exports = router;

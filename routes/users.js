var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/add', function(req, res, next){
	userDao.add(req, res, next);
});

module.exports = router;

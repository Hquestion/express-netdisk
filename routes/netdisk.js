/**
 * Created by 贺小雷 on 2017-07-06.
 */
var express = require('express');
var router = express.Router();

var diskDao = require('../dao/netDisk/diskDao');

router.get('/queryAll', function(req, res, next){
	diskDao.getAllFiles(req, res, next);
});
router.get('/getFileMeta', function(req, res, next){
	res.json({
		code: 0,
		data: '操作成功'
	})
});
router.post('/addFile', function(req, res, next){
	diskDao.addFile(req, res, next);
});
module.exports = router;
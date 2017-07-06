/**
 * Created by 贺小雷 on 2017-07-06.
 */
var config = require('../../config/DBConfig').netDisk;
var rootPath = require('../../config/DBConfig').RootPath;
var mysql = require('mysql');
var mapping = require('./diskSqlMapping');
var uuid = require('node-uuid');
var fs = require('fs');

var pool = mysql.createPool(config);

var getFileMeta = function(id, next, cb){
	pool.getConnection(function (err, connection) {
		if(err) {
			next(err);
			return;
		}
		var sql = mapping.queryFileMeta;
		connection.query(sql, [id], function(err, result){
			if(err) {
				next(err);
				return;
			}
			cb(result);

			connection.release();
		});
	});
};

module.exports = getFileMeta;
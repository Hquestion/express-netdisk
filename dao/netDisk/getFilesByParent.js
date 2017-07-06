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

var getFilesByParent = function(parentId, next, cb){
	pool.getConnection(function (err, connection) {
		if(err) {
			next(err);
			return;
		}
		var sql = !parentId ? mapping.queryRoot: mapping.queryByParent;
		connection.query(sql, parentId ? [parentId] : [], function(err, result){
			if(err) {
				next(err);
				return;
			}
			cb(result);

			connection.release();
		});
	});
};

module.exports = getFilesByParent;
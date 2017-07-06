/**
 * Created by 贺小雷 on 2017-07-03.
 */
var config = require('../config/DBConfig').mysql;
var mysql = require('mysql');
var userSqlMapping = require('../dao/userSqlMapping');
var uuid = require('node-uuid');

var pool = mysql.createPool(config);

var defineResult = function(res, ret){
	if(!ret) {
		res.json({
			code: 1,
			data: '操作错误'
		})
	}else {
		res.json(ret);
	}
};

module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err) {
				next(err);
				return;
			}
			// 获取前台页面传过来的参数
			var param = req.query || req.params;

			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query(userSqlMapping.insert, [uuid.v1(),param.name, param.age], function(err, result) {
				if(err) {
					next(err);
					return;
				}
				console.log(result);
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};
				}

				// 以json形式，把操作结果返回给前台页面
				defineResult(res, result);

				// 释放连接
				connection.release();
			});
		});
	}
};
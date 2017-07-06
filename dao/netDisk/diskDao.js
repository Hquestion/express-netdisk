/**
 * Created by 贺小雷 on 2017-07-06.
 */
var config = require('../../config/DBConfig').netDisk;
var rootPath = require('../../config/DBConfig').RootPath;
var mysql = require('mysql');
var mapping = require('./diskSqlMapping');
var uuid = require('node-uuid');
var fs = require('fs');
var debug = require('debug');
var getFileByParent = require('./getFilesByParent');
var getFileMeta = require('./getFileMeta');

var pool = mysql.createPool(config);

module.exports = {
	addFile: function(req, res, next){
		pool.getConnection(function(err, connection){
			if(err) {
				next(err);
				return;
			}
			var param = req.body;
			/**
			 * 根据类型区分创建文件夹还是文件
			 * type: 1   文件
			 * type: 0   文件夹
			 */
			if(param.parentId) {
				getFileMeta(param.parentId, next, function(data){
					data = data[0];
					var path = data.path;
					if(param.type === '0') {
						var toCreateFolderPath = rootPath + path + data.name + '\\' + param.name;
						fs.mkdir(toCreateFolderPath, function(err, floader){
							if(err) {
								res.json({
									code: 0,
									data: '创建文件夹失败！'
								});
								next(err);
								return;
							}
							connection.query(mapping.addFile, [uuid.v1(), 0, param.name, param.parentId, +new Date(), '贺小雷',0,'', path + data.name +  '\\'], function(err, result){
								if(err) {
									fs.rmdir(toCreateFolderPath);
									next(err);
									return;
								}
								if(result) {
									res.json({
										code: 0,
										data: '添加文件成功'
									});
								}
								connection.release();
							})
						})
					}
				});
			}else {
				if(param.type === '0') {
					fs.mkdir(rootPath + '\\' + param.name, function(err, floader){
						if(err) {
							res.json({
								code: 0,
								data: '创建文件夹失败！'
							});
							next(err);
							return;
						}
						connection.query(mapping.addFile, [uuid.v1(), 0, param.name, '', +new Date(), '贺小雷',0,'', '\\'], function(err, result){
							if(err) {
								fs.rmdir(rootPath + '\\' + param.name);
								next(err);
								return;
							}
							if(result) {
								res.json({
									code: 0,
									data: '添加文件成功'
								});
							}
							connection.release();
						})
					})
				}
			}
		})
	},
	getAllFiles: function(req, res, next){
		var param = req.query || req.params;
		getFileByParent(param.parentId, next, function(result){
			res.json({
				code: 0,
				data: result
			});
		});
	}
};
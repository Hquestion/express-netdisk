/**
 * Created by 贺小雷 on 2017-07-06.
 */
var diskSql = {
	queryRoot: 'select * from fs where parentId=\'\'',
	queryByParent: 'select * from fs where parentId=?',
	queryFileMeta: 'select * from fs where id=?',
	addFile: 'insert into fs(id,type,name,parentId,createtime,creator,size,filetype,path) values(?,?,?,?,?,?,?,?,?)'
};
module.exports = diskSql;
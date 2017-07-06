/**
 * Created by 贺小雷 on 2017-07-03.
 */
var User = {
	insert: 'insert into user(id, name, age) values(?,?,?)',
	update: 'update user set name=?,age=? where id=?'
};
module.exports = User;
/**
 * Created by 贺小雷 on 2017-07-03.
 */
const index = require('../routes/index');
const users = require('../routes/users');
const diskapi = require('../routes/netdisk');

var config = {
	'/': index,
	'/users': users,
	'/diskapi': diskapi
};

module.exports = config;
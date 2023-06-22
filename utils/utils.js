const { v4 } = require("uuid");
const moment = require('moment')

exports.uuid = v4();
exports.todoNo = Math.floor(Math.random() * 900000);
exports.momentDateNow = moment().format()
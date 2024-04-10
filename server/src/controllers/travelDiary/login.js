const User = require('../../models/usersModel')
const runtimeLog = require('../../utils/logger');
const secretKey = require('../../config/secretKey');
const jwt = require('jsonwebtoken');



module.exports = {login};
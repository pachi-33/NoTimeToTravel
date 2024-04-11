const { Reviewers } = require('../../models/reviewersModel')
const { runtimeLog } = require('../../utils/logger');
const { privateKey } = require('../../config/privateKey');
const { jwt } = require('jsonwebtoken');

const login = async function (req, res) {
    try {
        const { username, password } = req.data;
        const results = await Reviewers.findByUsernamePwd(username, password);
        const { reviewerId, auth } = results[0];
        const token = jwt.sign(
            { username, password, auth }, 
            privateKey, 
            { algorithm: 'HS256', expiresIn: '24h'}
        );
        const data ={
            status: 200,
            token,
            reviewerId,
            permission: auth
        }
        res.send(data);
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        runtimeLog.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
      }
};

module.exports = {login};
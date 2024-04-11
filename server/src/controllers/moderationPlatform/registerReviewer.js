const { Reviewers } = require('../../models/reviewersModel')
const { runtimeLog } = require('../../utils/logger');
const { privateKey } = require('../../config/privateKey');
const { jwt } = require('jsonwebtoken');

const login = async function (req, res) {
    try {
        const { username, password } = req.data;
        await Reviewers.append(username, password);
        const data ={
            status: 200
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
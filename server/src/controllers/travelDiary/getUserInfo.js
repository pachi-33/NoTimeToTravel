const { User } = require('../../models/UsersModel');
const { runtimeLog } = require('../../utils/logger');

const getUserInfo = async function (req, res) {
    try {
        const { openid } = req.data;
        const rows = await User.findAllByOpenid(openid);
        const { nickname, avatar } = rows[0];
        const data ={
            status: 200,
            nickname,
            avatarUrl: avatar,
            msg: 'Get user info success.'
        };
        res.send(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        runtimeLog.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
      }
};

module.exports = {getUserInfo};
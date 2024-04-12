const { User } = require('../../models/usersModel')
const { runtimeLog } = require('../../utils/logger');

const setAvatar = async function (req, res) {
    try {
        const { img, openid } = req.data;
        await User.setAvatar(openid, img);
        const data = {
            status: 200
        };
        res.send(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        runtimeLog.error('Error fetching data:', error);
        res.status(500).json({ error: 'Upload failed.' });
      }
};

module.exports = {setAvatar};
const { User } = require('../../models/UsersModel')
const { runtimeLog } = require('../../utils/logger');

const setNickname = async function (req, res) {
    try {
        const { openid, nickname } = req.data;
        const rows = await User.checkDuplicateNickname( nickname );
        if(rows){
            res.send({
                status: 400,
                msg: 'Duplicate nickname.'
            })
        }else{
            await User.setNickname(openid, nickname);
            const data = {
                status: 200
            };
            res.send(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        runtimeLog.error('Error fetching data:', error);
        res.status(500).json({ error: 'Upload failed.' });
      }
};

module.exports = {setNickname};
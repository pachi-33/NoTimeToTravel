const { User } = require('../../models/usersModel')
const { runtimeLog } = require('../../utils/logger');
const { privateKey } = require('../../config/privateKey');
const { jwt } = require('jsonwebtoken');
const { wx_secret_key, wx_appid } = require('../../config/wxConfig');

const login = async function (req, res) {
    try {
        const { code } = req.data;
        const response = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?\
        appid=${wx_appid}\
        secret_key=${wx_secret_key}\
        js_code=${code}\
        grant_type=authorization_code\
        `);
        const {session_key, errcode, openid, errmsg} = response;
        if(errcode===0){
            //判断用户openid是否存在，避免重复注册
            const rows = await User.findAllByOpenid(openid);
            if(rows.length===1){
                User.freshUser(openid, session_key);
            }else{
                User.setAvatar(openid, 'https://img-blog.csdnimg.cn/img_convert/b573b00bed7126db2c209ed01eb35189.png');
                User.setNickname(openid, '游客'+openid);
                User.append(openid, session_key);
            } 
        }else{
            throw new Error(errmsg);
        }
        // 返回
        const token = jwt.sign(
            { openid, session_key }, 
            privateKey, 
            { algorithm: 'HS256', expiresIn: '24h'}
        );
        const data ={
            status: 200,
            msg: 'Login success.',
            token
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
// 根据 openid 查询用户
// 根据 openid, session_key 更新用户？
// 根据 openid, session_key 创建用户
// 设置昵称
// 设置头像

const { myQuery } = require('../utils/myQuery');
const { runtimeLog } = require('../utils/logger');

const Users = {
    append: async function(openid, session_key){
        const sql = ` INSERT INTO users (openid, session_key) VALUES \
        (?,?);\
        `;
        try {
            const feedback = await myQuery(sql, [openid, session_key]);
            console.log('Added a new user: ', feedback);
            runtimeLog.info('Added a new user: ',feedback);
        } catch(err) {
            console.log('Error when adding new user: ', err);
            runtimeLog.error('Error when adding new user: ', err);
        }
    },

    freshUser: async function(openid, session_key){
        const sql = `UPDATE users SET session_key = ? WHERE openid = ?`;
        try {
            const feedback = await myQuery(sql, [openid, session_key]);
            console.log('Fresh a user session key', feedback);
            runtimeLog.info('Fresh a user session key', feedback);
        } catch(err) {
            console.log('Error when find user by openid: ', err);
            runtimeLog.error('Error when find user by openid: ', err);
        }
    },

    findAllByOpenid: async function(openid){
        const sql = ` SELECT * FROM users WHERE openid = ? `;
        try {
            const rows = await myQuery(sql, [openid]);
            return rows;
        } catch(err) {
            console.log('Error when find user by openid: ', err);
            runtimeLog.error('Error when find user by openid: ', err);
        }
    },

    setAvatar: async function(openid, avatarUrl){
        const sql = ` UPDATE users SET avatar = ? WHERE openid = ? `;
        try {
            const feedback = await myQuery(sql, [avatarUrl, openid]);
            console.log('Set avatar.', feedback);
            runtimeLog.info('Set avatar.', feedback);
        } catch(err) {
            console.log('Error when set avatar: ', err);
            runtimeLog.error('Error when set avatar: ', err);
        }
    },

    setNickname: async function(openid, newNickname){
        const sql = ` UPDATE users SET nickname = ? WHERE openid = ? `;
        try {
            const feedback = await myQuery(sql, [newNickname, openid]);
            console.log('Set nickname.', feedback);
            runtimeLog.info('Set nickname.', feedback);
        } catch(err) {
            console.log('Error when set nickname: ', err);
            runtimeLog.error('Error when set nickname: ', err);
        }
    }

}

module.exports = {Users};
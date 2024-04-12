// 根据游记编号 收藏者uid 收藏时间 添加收藏表
// 根据uid获取收藏列表

const { myQuery } = require('../utils/myQuery');
const { runtimeLog }= require('../utils/logger');
const { tellTime } = require('../utils/tellTime');

const Collection = {
    append: async function (noteId, openid){
        const { year, month, day, hour, minute, second } = tellTime();
        const formatTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        const sql = `INSERT INTO collection (noteId, openid, commentTime) VALUES (?,?,?)`;
        try {
            const feedback = await myQuery(sql, [noteId, openid, formatTime]);
            console.log('Add a collection: ', feedback);
            runtimeLog.info('Add a collection: ',feedback);
        } catch(err) {
            console.log('Error when adding collection: ', err);
            runtimeLog.error('Error when adding collection: ', err);
        }
    },

    cancelCollectNote: async function (noteId, openid){
        const sql = `DELETE FROM collection WHERE noteId = ? AND openid = ?`;
        try {
            const feedback = await myQuery(sql, [noteId, openid]);
            console.log('Delete a collection: ', feedback);
            runtimeLog.info('Delete a collection: ',feedback);
        } catch(err) {
            console.log('Error when delete collection: ', err);
            runtimeLog.error('Error when delete collection: ', err);
        }
    },

    queryCollectionListByOpenid: async function (openid){
        const sql = `SELECT noteId, noteTitle, nickname, avatar, likeNum, uploadTime \
        FROM travelNote JOIN users ON travelNote.updateBy = users.uid WHERE noteId IN \
        (SELECT noteId FROM collection WHERE collection.openid = ?)`;
        try {
            const row = await myQuery(sql, [openid]);
            return row;
        } catch(err) {
            console.log('Error when get note list in collection: ', err);
            runtimeLog.error('Error when note list in collection: ', err);
        }
    }
};

module.exports = {Collection};
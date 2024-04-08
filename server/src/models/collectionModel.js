// 根据游记编号 收藏者uid 收藏时间 添加收藏表
// 根据uid获取收藏列表

const { myQuery } = require('../utils/myQuery');
const { runtimeLog }= require('../utils/logger');
const { tellTime } = require('../utils/tellTime');

const collection = {
    append: async function (noteId, uid){
        const { year, month, day, hour, minute, second } = tellTime();
        const formatTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        const sql = `INSERT INTO collection (noteId, uid, commentTime) VALUES (?,?,?)`;
        try {
            const feedback = await myQuery(sql, [noteId, uid, formatTime]);
            console.log('Add a collection: ', feedback);
            runtimeLog.info('Add a collection: ',feedback);
        } catch(err) {
            console.log('Error when adding collection: ', err);
            runtimeLog.error('Error when adding collection: ', err);
        }
    },

    queryCollectionListByuid: async function (uid){
        const sql = `SELECT * FROM travelNote WHERE noteId IN \
        (SELECT noteId FROM collection WHERE collection.uid = ?)`;
        try {
            const row = await myQuery(sql, [uid]);
            return row;
        } catch(err) {
            console.log('Error when get note list in collection: ', err);
            runtimeLog.error('Error when note list in collection: ', err);
        }
    }
};

module.exports = {collection};
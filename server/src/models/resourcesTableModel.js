// 根据游记编号和url增加资源记录
// 根据游记编号查询资源列表

const { myQuery } = require('../utils/myQuery');
const { runtimeLog }= require('../utils/logger');

const Resources = {
    append: async function (noteid, idx, mediaType, url){
        const sql = `INSERT INTO resources (noteid, idx, mediaType, url) VALUES (?,?,?,?)`;
        try {
            const feedback = await myQuery(sql, [noteid, idx, mediaType, url]);
            console.log('Added new resources: ', feedback);
            runtimeLog.info('Added new resources: ',feedback);
        } catch(err) {
            console.log('Error when adding new resources: ', err);
            runtimeLog.error('Error when adding new resources: ', err);
        }
    },

    queryList: async function (noteid){
        const sql = `SELECT * FROM resources WHERE noteId = ?\
        ORDERED BY idx ASC`;
        try {
            const row = await myQuery(sql, [noteid]);
            return row;
        } catch(err) {
            console.log('Error when query resources: ', err);
            runtimeLog.error('Error when query resources: ', err);
        }
    }
};

module.exports = {Resources};
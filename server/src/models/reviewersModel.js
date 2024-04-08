// 注册审核员
// 根据账号 密码 查询审核员
// 删除审核员

const { myQuery } = require('../utils/myQuery');
const { runtimeLog }= require('../utils/logger');

const Reviewers = {
    append: async function (username, password){
        const sql = ` INSERT INTO reviewers (username, password) VALUES \
        (?,?);\
        `;
        try {
            const feedback = await myQuery(sql, [username, password]);
            console.log('Added a new reviewers: ', feedback);
            runtimeLog.info('Added a new reviewers: ',feedback);
        } catch(err) {
            console.log('Error when adding a new reviewers: ', err);
            runtimeLog.error('Error when adding a new reviewers: ', err);
        }
    },

    findByUsernamePwd: async function (username, password){
        const sql = `SELECT * FROM reviewers WHERE username = ? and password = ?`;
        try {
            const raw = await myQuery(sql, [username, password]);
            return raw;
        } catch(err) {
            console.log('Error when find reviewer: ', err);
            runtimeLog.error('Error when find reviewer: ', err);
        }
    },

    dropByReviewerId: async function (reviewerId){
        const sql = `DELETE FROM reviewers WHERE reviewerId = ?`;
        try {
            const feedback = await myQuery(sql, [reviewerId]);
            console.log('Delete a reviewer: ', feedback);
            runtimeLog.info('Delete a reviewer: ',feedback);
        } catch(err) {
            console.log('Error when delete reviewer: ', err);
            runtimeLog.error('Error when delete reviewer: ', err);
        }
    }
};

module.exports = Reviewers;
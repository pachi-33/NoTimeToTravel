// 创建一个审核单
// 根据游记编号 和 审核员编号 和 审核时间 修改审核状态
// 根据游记编号 查询审核状态
// 根据游记编号 增加审核注释
// 根据审核员查询所有游记列表

const { myQuery } = require('../utils/myQuery');
const { runtimeLog }= require('../utils/logger');
const { tellTime } = require('../utils/tellTime');


const ReviewTable = {
    append: async function (noteId){
        const sql = `INSERT INTO review (noteId, status) \
        VALUES (?, 'waiting')`;
        try {
            const feedback = await myQuery(sql, [noteId]);
            console.log('Added a new review table: ', feedback);
            runtimeLog.info('Added a new review table: ',feedback);
        } catch(err) {
            console.log('Error when adding new travel note: ', err);
            runtimeLog.error('Error when adding new travel note: ', err);
        }
    },

    modifyStatus: async function (noteId, reviewerId, toStatus){
        const { year, month, day, hour, minute, second } = tellTime();
        const formatTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        const sql = `UPDATE review SET reviewTime = ?, reviewerId = ?, status = ? WHERE noteId = ?`;
        try {
            const feedback = await myQuery(sql, [formatTime, reviewerId, toStatus, comment, noteId]);
            console.log('Update review status: ', feedback);
            runtimeLog.info('Update review status: ',feedback);
        } catch(err) {
            console.log('Error when update review status: ', err);
            runtimeLog.error('Error when update review status: ', err);
        }
    },

    queryStatus: async function (noteId){
        const sql = `SELECT status WHERE noteId = ?`;
        try {
            const row = await myQuery(sql, [noteId]);
            return row;
        } catch(err) {
            console.log('Error when query review status: ', err);
            runtimeLog.error('Error when query review status: ', err);
        }
    },

    addComment: async function (noteId, comment){
        const sql = `UPDATE review SET comment = ? WHERE noteId = ?`;
        try {
            const feedback = await myQuery(sql, [noteId, comment]);
            console.log('Add review comment: ', feedback);
            runtimeLog.info('Add review comment: ',feedback);
        } catch(err) {
            console.log('Error when adding review comment: ', err);
            runtimeLog.error('Error when adding review comment: ', err);
        }
    },

    queryNoteIdByReviewId: async function (reviewId){
        const sql = `SELECT * FROM travelNote WHERE noteId IN \
        (SELECT review.noteId FROM review WHERE review.reviewId = ?) `;
        try {
            const row = await myQuery(sql, [reviewId]);
            return row;
        } catch(err) {
            console.log('Error when adding review comment: ', err);
            runtimeLog.error('Error when adding review comment: ', err);
        }
    }
};

module.exports = {ReviewTable};
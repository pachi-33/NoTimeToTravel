// 根据游记编号、用户uid、内容、时间增加评论记录
// 根据游记编号查询评论列表

const { myQuery } = require('../utils/myQuery');
const { runtimeLog }= require('../utils/logger');
const { tellTime } = require('../utils/tellTime');

const comments = {
    append: async function (noteId, commentBy, commentContent){
        const { year, month, day, hour, minute, second } = tellTime();
        const formatTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        const sql = `INSERT INTO comments (noteId, commentBy, commentContent, commentTime) VALUES (?,?,?,?)`;
        try {
            const feedback = await myQuery(sql, [noteId, commentBy, commentContent, formatTime]);
            console.log('Add a comment: ', feedback);
            runtimeLog.info('Add a comment: ',feedback);
        } catch(err) {
            console.log('Error when adding comment: ', err);
            runtimeLog.error('Error when adding comment: ', err);
        }
    },

    queryCommentListByNoteid: async function (noteId){
        const sql = `SELECT * FROM comments WHERE noteId = ?`;
        try {
            const row = await myQuery(sql, [noteId]);
            return row;
        } catch(err) {
            console.log('Error when get comment list by noteid: ', err);
            runtimeLog.error('Error when get comment list by noteid: ', err);
        }
    }
};

module.exports = {comments};
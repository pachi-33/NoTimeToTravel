// 创建游记
// 修改游记
// 查询游记内容
// 根据时间查询列表
// 根据标题查询列表
// 根据作者昵称查询列表
// 根据游记编号 增加浏览量
// 根据游记编号 增加获赞量
// 根据游记编号 增加收藏量

const { myQuery } = require('../utils/myQuery');
const { runtimeLog }= require('../utils/logger');
const { tellTime } = require('../utils/tellTime');


const TravelNote = {
    append: async function (noteTitle, noteContent, updateBy, location){
        const { year, month, day, hour, minute, second } = tellTime();
        const formatTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
        const sql = `INSERT INTO travelNote (noteTitle, noteContent, updateBy, viewNum, likeNum, collectNum, uploadTime, lastModifyTime, location) \
        VALUES (?, ?, ?, 0, 0, 0, ?, ?, ?)\
        `;
        try {
            const feedback = await myQuery(sql, [noteTitle, noteContent, updateBy, formatTime, formatTime, location]);
            console.log('Added a new travel note: ', feedback);
            runtimeLog.info('Added a new travel note: ',feedback);
        } catch(err) {
            console.log('Error when adding new travel note: ', err);
            runtimeLog.error('Error when adding new travel note: ', err);
        }
    },

    modify: async function (noteId, noteTitle, noteContent, updateBy, location){
        const { year, month, day, hour, minute, second } = tellTime();
        const formatTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        const sql = `UPDATE travelNote\
        SET noteTitile = ?\
        noteContent = ?\
        updateBy = ?\
        location = ?\
        lastModifyTime = ?\
        WHERE noteId = ?\
        `;
        try {
            const feedback = await myQuery(sql, [noteTitle, noteContent, updateBy, location, formatTime, noteId]);
            console.log('Modified a travel note: ', feedback);
            runtimeLog.info('Modified a travel note: ',feedback);
        } catch(err) {
            console.log('Error when Modify a travel note: ', err);
            runtimeLog.error('Error when Modify a travel note: ', err);
        }
    },

    getNoteDetail: async function (noteId){
        const sql = `SELECT * FROM travelNote WHERE noteId = ?`;
        try {
            const row = await myQuery(sql, [noteId]);
            return row;
        } catch(err) {
            console.log('Error when get travel note detail: ', err);
            runtimeLog.error('Error when get travel note detail: ', err);
        }
    },


    // diary user

    getNoteListByTime: async function (before, len){
        const sql = `SELECT * FROM travelNote \
        WHERE uploadTime < ? AND noteId IN ( SELECT noteId FROM review WHERE status = 'approved') \
        ORDER BY uploadTime DESC \
        LIMIT ? `;
        try {
            const row = await myQuery(sql, [before, len]);
            return row;
        } catch(err) {
            console.log('Error when get travel note list by time: ', err);
            runtimeLog.error('Error when get travel note list by time: ', err);
        }
    },

    getNoteListById: async function (before, len){
        const sql = `SELECT * FROM travelNote \
        WHERE noteId > ? AND noteId IN ( SELECT noteId FROM review WHERE status = 'approved')\
        ORDER BY noteId ASC \
        LIMIT ? `;
        try {
            const row = await myQuery(sql, [before, len]);
            return row;
        } catch(err) {
            console.log('Error when get travel note list by id: ', err);
            runtimeLog.error('Error when get travel note list by id: ', err);
        }
    },

    getNoteListSearchTitleByTime: async function (beforeTime, keywords, len){
        const sql = `SELECT * FROM travelNote \
        WHERE uploadTime < ? and noteTitle REGEXP ? AND noteId IN ( SELECT noteId FROM review WHERE status = 'approved')\
        ORDER BY uploadTime DESC \
        LIMIT ?`;
        try {
            const row = await myQuery(sql, [beforeTime, keywords, len]);
            return row;
        } catch(err) {
            console.log('Error when searching title before time: ', err);
            runtimeLog.error('Error when searching title before time: ', err);
        }
    },

    getNoteListSearchTitleById: async function (beforeId, keywords, len){
        const sql = `SELECT * FROM travelNote \
        WHERE uploadTime < ? and noteTitle REGEXP ? AND noteId IN ( SELECT noteId FROM review WHERE status = 'approved')\
        ORDER BY noteId ASC \
        LIMIT ?`;
        try {
            const row = await myQuery(sql, [beforeId, keywords, len]);
            return row;
        } catch(err) {
            console.log('Error when searching title before id: ', err);
            runtimeLog.error('Error when searching title before id: ', err);
        }
    },

    getNoteListSearchNicknameByTime: async function (beforeTime, keywords, len){
        const sql = `SELECT * FROM travelNote \
        WHERE uploadTime < ? and \
        updateBy IN \
        (SELECT nickname FROM users WHERE nickname REGEXP ?) \
        AND noteId IN ( SELECT noteId FROM review WHERE status = 'approved') \
        ORDER BY uploadTime DESC \
        LIMIT ?`;
        try {
            const row = await myQuery(sql, [beforeTime, keywords, len]);
            return row;
        } catch(err) {
            console.log('Error when searching nickname before time: ', err);
            runtimeLog.error('Error when searching nickname before time: ', err);
        }
    },

    getNoteListSearchNicknameById: async function (beforeId, keywords, len){
        const sql = `SELECT * FROM travelNote \
        WHERE uploadTime < ? and \
        updateBy IN \
        (SELECT nickname FROM users WHERE nickname REGEXP ?)\
        AND noteId IN ( SELECT noteId FROM review WHERE status = 'approved') \
        ORDER BY uploadTime ASC \
        LIMIT ?`;
        try {
            const row = await myQuery(sql, [beforeId, keywords, len]);
            return row;
        } catch(err) {
            console.log('Error when searching nickname before id: ', err);
            runtimeLog.error('Error when searching nickname before id: ', err);
        }
    },

    addLike: async function (noteId){
        const sql = `UPDATE travelNote SET likeNum = likeNum+1 WHERE noteId = ?`;
        try {
            await myQuery(sql, [noteId]);
        } catch(err) {
            console.log('Error when adding like num: ', err);
            runtimeLog.error('Error when adding like num: ', err);
        }
    },

    addView: async function (noteId){
        const sql = `UPDATE travelNote SET viewNum = viewNum+1 WHERE noteId = ?`;
        try {
            await myQuery(sql, [noteId]);
        } catch(err) {
            console.log('Error when adding view num: ', err);
            runtimeLog.error('Error when adding view num: ', err);
        }
    },

    addCollect: async function (noteId){
        const sql = `UPDATE travelNote SET collectNum = collectNum+1 WHERE noteId = ?`;
        try {
            await myQuery(sql, [noteId]);
        } catch(err) {
            console.log('Error when adding collect num: ', err);
            runtimeLog.error('Error when adding collect num: ', err);
        }
    },

    getAllList: async function (){
        const sql = `SELECT * FROM travelNote`;
        try {
            const row = await myQuery(sql, [noteId]);
            return row;
        } catch(err) {
            console.log('Error when get all list: ', err);
            runtimeLog.error('Error when get all list: ', err);
        }
    }


}

module.exports = {TravelNote}
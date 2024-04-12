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
    append: async function (noteTitle, noteContent, openid, location){
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

    getNoteId: async function (noteTitle, noteContent, openid, location){
        const sql = `SELECT noteId FROM travelNote \
        WHERE noteTitle = ? AND noteContent = ? AND location = ? \
        AND updateBy IN \
        ( SELECT uid AS updateBy FROM users WHERE openid = ?) `;
        try {
            const rows = await myQuery(sql, [noteTitle, noteContent, location, openid]);
            return rows;
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

    deleteNote: async function (noteId) {
        const sql = `DELETE FROM travelNote WHERE noteId = ?`;
        try {
            const feedback = await myQuery(sql, [noteId]);
            console.log('Deleted a travel note: ', feedback);
            runtimeLog.info('Deleted a travel note: ',feedback);
        } catch(err) {
            console.log('Error when delete note: ', err);
            runtimeLog.error('Error when delete note: ', err);
        }
    },

    getNoteDetail: async function (noteId){
        const sql = `SELECT noteId, noteTitle, noteContent, nickname, avatar, viewNum, likeNum, collectNum, lastModifyTime, location \
        FROM travelNote JOIN users ON travelNote.updateBy = users.uid \
        WHERE noteId = ?`;
        try {
            const row = await myQuery(sql, [noteId]);
            return row;
        } catch(err) {
            console.log('Error when get travel note detail: ', err);
            runtimeLog.error('Error when get travel note detail: ', err);
        }
    },

    getSrcList: async function (noteId){
        const sql = `SELECT mediaType, url FROM resources \
        WHERE noteId = ? \
        ORDER BY idx ASC \
        `;
        try {
            const rows = await myQuery(sql, [noteId]);
            return rows;
        } catch(err) {
            console.log('Error when get travel note resources list: ', err);
            runtimeLog.error('Error when get travel note resources list: ', err);
        }
    },

    // diary user

    getNoteListByTime: async function (before, len){
        const sql = ` SELECT noteId, noteTitle, url, mediaType, nickname, avatar, likeNum, uploadTime
        (SELECT noteId, noteTitle, nickname, avatar, likeNum, uploadTime \
        FROM (travelNote JOIN users ON travelNote.updateBy = users.uid) \
        WHERE uploadTime < ? AND noteId IN ( SELECT noteId FROM review WHERE status = 'approved') ) t1\
        JOIN resourse ON t1.noteId = resources.noteId \
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
            const row = await myQuery(sql);
            return row;
        } catch(err) {
            console.log('Error when get all list: ', err);
            runtimeLog.error('Error when get all list: ', err);
        }
    },

    getUserNoteList: async function (uid){
        const sql = `SELECT noteId, noteTitle, url, mediaType, nickname, avatar, likeNum, uploadTime
        (SELECT noteId, noteTitle, nickname, avatar, likeNum, uploadTime \
        FROM (travelNote JOIN users ON travelNote.updateBy = users.uid) \
        WHERE users.uid = ? AND  noteId IN ( SELECT noteId FROM review WHERE status = 'approved') ) t1\
        JOIN resourse ON t1.noteId = resources.noteId \
        ORDER BY uploadTime DESC `;
        try {
            const row = await myQuery(sql, [uid]);
            return row;
        } catch(err) {
            console.log('Error when getUserNoteList: ', err);
            runtimeLog.error('Error when getUserNoteList: ', err);
        }
    }
}

module.exports = {TravelNote}
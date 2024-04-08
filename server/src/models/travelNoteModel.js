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
const { tellTime } = require('../utils/tellTime')


const TravelNote = {
    append: async function (noteTitle, noteContent, updateBy, location){
        const { year, month, day, hour, minute, second } = tellTime();
        const formatTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
        const sql = `INSERT INTO travelNote (noteTitle, noteContent, updateBy, viewNum, likeNum, collectNum, uploadTime, lastModifyTime, location) \
        VALUES (${noteTitle}, ${noteContent}, ${updateBy}, 0, 0, 0, ${formatTime}, ${formatTime}, ${location})\
        `;
        try {
            const feedback = await myQuery(sql);
            console.log('Added a new travel note: ', feedback);
            runtimeLog.info('Added a new travel note: ',feedback);
        } catch(err) {
            console.log('Error when adding new travel note: ', err);
            runtimeLog.error('Error when adding new travel note: ', err);
        }
    },

    modify: async function (noteId, noteTitle, noteContent, updateBy, location){
        const { year, month, day, hour, minute, second } = tellTime();
        const formatTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
        const sql = `UPDATE travelNote\
        SET noteTitile = ${noteTitle}\
        noteContent = ${noteContent}\
        updateBy = ${updateBy}\
        location = ${location}\
        lastModifyTime = ${formatTime}\
        WHERE noteId = ${noteId}\
        `;
        try {
            const feedback = await myQuery(sql);
            console.log('Modified a travel note: ', feedback);
            runtimeLog.info('Modified a travel note: ',feedback);
        } catch(err) {
            console.log('Error when Modify a travel note: ', err);
            runtimeLog.error('Error when Modify a travel note: ', err);
        }
    },

    getNoteDetail: async function (noteId){
        const sql = `SELECT * FROM travelNote WHERE noteId = ${noteId}`;
        try {
            const row = await myQuery(sql);
            return row;
        } catch(err) {
            console.log('Error when get travel note detail: ', err);
            runtimeLog.error('Error when get travel note detail: ', err);
        }
    },

    getNoteListByTime: async function (before, len){
        const sql = `SELECT * FROM travelNote WHERE uploadTime < ${before} LIMIT ${len} `;
        try {
            const row = await myQuery(sql);
            return row;
        } catch(err) {
            console.log('Error when get travel note list by time: ', err);
            runtimeLog.error('Error when get travel note list by time: ', err);
        }
    },

    getNoteListById: async function (before, len){
        const sql = `SELECT * FROM travelNote WHERE noteId > ${before} LIMIT ${len} `;
        try {
            const row = await myQuery(sql);
            return row;
        } catch(err) {
            console.log('Error when get travel note list by id: ', err);
            runtimeLog.error('Error when get travel note list by id: ', err);
        }
    },

    getNoteListSearchTitleByTime: async function (beforeTime, keywords, len){
        const sql = `SELECT * FROM travelNote \
        WHERE uploadTime < ${beforeTime} and noteTitle REGEXP ${keywords}\
        LIMIT ${len}`;
        try {
            const row = await myQuery(sql);
            return row;
        } catch(err) {
            console.log('Error when searching title before time: ', err);
            runtimeLog.error('Error when searching title before time: ', err);
        }
    },

    getNoteListSearchTitleById: async function (beforeId, keywords, len){
        const sql = `SELECT * FROM travelNote \
        WHERE uploadTime < ${beforeId} and noteTitle REGEXP ${keywords}\
        LIMIT ${len}`;
        try {
            const row = await myQuery(sql);
            return row;
        } catch(err) {
            console.log('Error when searching title before id: ', err);
            runtimeLog.error('Error when searching title before id: ', err);
        }
    },

    getNoteListSearchNicknameByTime: async function (beforeTime, keywords, len){
        const sql = `SELECT * FROM travelNote \
        WHERE uploadTime < ${beforeTime} and \
        updateBy IN \
        (SELECT nickname FROM users WHERE nickname REGEXP ${keywords})\
        LIMIT ${len}`;
        try {
            const row = await myQuery(sql);
            return row;
        } catch(err) {
            console.log('Error when searching title before time: ', err);
            runtimeLog.error('Error when searching title before time: ', err);
        }
    },

    getNoteListSearchNicknameById: async function (beforeId, keywords, len){
        const sql = `SELECT * FROM travelNote \
        WHERE uploadTime < ${beforeId} and \
        updateBy IN \
        (SELECT nickname FROM users WHERE nickname REGEXP ${keywords})\
        LIMIT ${len}`;
        try {
            const row = await myQuery(sql);
            return row;
        } catch(err) {
            console.log('Error when searching title before id: ', err);
            runtimeLog.error('Error when searching title before id: ', err);
        }
    },

    addLike: async function (noteId){
        const sql = `UPDATE travelNote SET likeNum = likeNum+1 WHERE noteId = ${noteId}`;
        try {
            await myQuery(sql);
        } catch(err) {
            console.log('Error when searching title before id: ', err);
            runtimeLog.error('Error when searching title before id: ', err);
        }
    },

    addView: async function (noteId){
        const sql = `UPDATE travelNote SET viewNum = viewNum+1 WHERE noteId = ${noteId}`;
        try {
            await myQuery(sql);
        } catch(err) {
            console.log('Error when searching title before id: ', err);
            runtimeLog.error('Error when searching title before id: ', err);
        }
    },

    addCollect: async function (noteId){
        const sql = `UPDATE travelNote SET collectNum = collectNum+1 WHERE noteId = ${noteId}`;
        try {
            await myQuery(sql);
        } catch(err) {
            console.log('Error when searching title before id: ', err);
            runtimeLog.error('Error when searching title before id: ', err);
        }
    }

}

module.exports = {TravelNote}
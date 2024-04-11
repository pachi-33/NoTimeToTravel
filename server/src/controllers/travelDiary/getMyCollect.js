const { Collection } = require('../../models/collectionModel');
const { runtimeLog } = require('../../utils/logger');
const { getVideoCover } = require('../../utils/getVideoCover');
const { videoCoverCache } = require('../../utils/videoCoverCache');

const clipCover = async function (url) {
    const result = videoCoverCache.get(url);
    if (result !== -1) {
        return result;
    } else {
        const cvr = await getVideoCover(url);
        videoCoverCache.put(url, cvr);
        return cvr;
    }
};

const collectNote = async function (req, res) {
    try {
        const { openid, noteId, uid } = req.data;
        const rows = await Collection.queryCollectionListByOpenid(openid);
        const noteList = rows.map( async obj => {
            const { noteId, noteTitle, nickname, avatar, likeNum, uploadTime, url, mediaType } = obj;
            let coverImg = url;
            if(mediaType === 'video'){
                coverImg = await clipCover(url);
            }
            return {
                noteId, 
                title: noteTitle, 
                authorNickname: nickname, 
                authorAvatar: avatar, 
                coverImg,
                likeNum, 
                uploadTime
            };
        });
        res.send({
            status: 200,
            noteList
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        runtimeLog.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
      }
};

module.exports = {collectNote};
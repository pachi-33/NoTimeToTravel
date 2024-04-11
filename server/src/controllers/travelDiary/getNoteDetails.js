const { Collection } = require('../../models/collectionModel');
const { TravelNote } = require('../../models/travelNoteModel');
const { runtimeLog } = require('../../utils/logger');

const getNoteDetails = async function (req, res) {
    try {
        const { openid, noteId } = req.data;
        const details = await TravelNote.getNoteDetail(noteId);
        const {noteTitle, noteContent, nickname, avatar, viewNum, likeNum, collectNum, lastModifyTime, location} = details;
        const resourcesList = await TravelNote.getSrcList(noteId);
        const collectionList = await Collection.queryCollectionListByOpenid(openid);
        const collectedNoteId = collectionList.map(obj => obj.noteId);
        const isCollected = collectedNoteId.includes(noteId)?'true':'false';
        await TravelNote.addView(noteId);
        const data ={
            status: 200,
            content: {
                noteId,
                noteTitle,
                noteContent,
                authorNickname: nickname,
                avatar,
                viewNum,
                likeNum,
                collectNum,
                isCollected,
                lastModifyTime,
                location,
                resources: resourcesList
            }
        };
        res.send(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        runtimeLog.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
      }
};

module.exports = {getNoteDetails};
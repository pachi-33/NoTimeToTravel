const { Collection } = require('../../models/collectionModel');
const { TravelNote } = require('../../models/travelNoteModel');
const { runtimeLog } = require('../../utils/logger');

const getNoteInfo = async function (req, res) {
    try {
        const { openid, noteId } = req.data;
        const details = await TravelNote.getNoteDetail(noteId);
        const {noteTitle, noteContent, nickname, lastModifyTime, location} = details;
        const resourcesList = await TravelNote.getSrcList(noteId);
        await TravelNote.addView(noteId);
        const data ={
            status: 200,
            content: {
                noteTitle,
                noteContent,
                authorNickname: nickname,
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

module.exports = {getNoteInfo};
const { TravelNote } = require('../../models/travelNoteModel');
const { Resources } = require('../../models/resourcesTableModel');
const { runtimeLog } = require('../../utils/logger');

const uploadNote = async function (req, res) {
    try {
        const { content, openid } = req.data;
        const { noteTitle, noteContent, location, resources } = content;
        await TravelNote.append(noteTitle, noteContent, openid, location);
        const newNoteId = await TravelNote.getNoteId(noteTitle, noteContent, openid, location);
        await Promise.all(resources.map(async (obj, index) => {
            Resources.append(newNoteId, index, obj.mediaType, obj.url);
        }));
        res.send({
            status: 200
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        runtimeLog.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
      }
};

module.exports = {uploadNote};
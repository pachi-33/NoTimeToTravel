const { TravelNote } = require('../../models/travelNoteModel');
const { Resources } = require('../../models/resourcesTableModel');
const { runtimeLog } = require('../../utils/logger');

const modifyNote = async function (req, res) {
    try {
        const { content, openid, uid } = req.data;
        const { noteId, noteTitle, noteContent, location, resources } = content;
        await TravelNote.modify(noteId, noteTitle, noteContent, uid, location);
        await Resources.flush(noteId);
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

module.exports = {modifyNote};
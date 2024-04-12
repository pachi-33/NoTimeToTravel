const { TravelNote } = require('../../models/travelNoteModel');
const { runtimeLog } = require('../../utils/logger');

const deleteNote = async function (req, res) {
    try {
        const { openid, noteId } = req.data;
        await TravelNote.deleteNote(noteId);
        res.send({
            status: 200
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        runtimeLog.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
      }
};

module.exports = {deleteNote};
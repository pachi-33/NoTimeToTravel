const { TravelNote } = require('../../models/travelNoteModel');
const { ReviewTable } = require('../../models/reviewTableModel');
const { runtimeLog } = require('../../utils/logger');

const approveNote = async function (req, res) {
    try {
        const { openid, noteId, action, reviewerId } = req.data;
        await Promise.all(noteId.map( obj => {
            ReviewTable.modifyStatus(obj.noteId, reviewerId, action);
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

module.exports = { approveNote };
const { Collection } = require('../../models/collectionModel');
const { runtimeLog } = require('../../utils/logger');

const cancelCollectNote = async function (req, res) {
    try {
        const { openid, noteId } = req.data;
        await Collection.cancelCollectNote(noteId, openid);
        res.send({
            status: 200
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        runtimeLog.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
      }
};

module.exports = {cancelCollectNote};
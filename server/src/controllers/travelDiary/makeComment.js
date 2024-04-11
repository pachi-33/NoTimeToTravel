const { Comment } = require('../../models/commentModel');
const { runtimeLog } = require('../../utils/logger');

const makeComments = async function (req, res) {
    try {
        const { openid, noteId, commentContent } = req.data;
        await Comment.append(noteId, openid, commentContent);
        res.send({
            status: 200
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        runtimeLog.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
      }
};

module.exports = {makeComments};
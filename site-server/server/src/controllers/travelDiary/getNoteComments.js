const { Comment } = require('../../models/commentModel');
const { runtimeLog } = require('../../utils/logger');

const getNoteComments = async function (req, res) {
    try {
        const { openid, noteId } = req.data;
        const rows = await Comment.queryCommentListByNoteid(noteId);
        const commentList = rows.map( obj => {
            return {
                ...obj, 
                commentBy: obj.nickname,
            };  
        })

        const data = {
            status: 200,
            comments: commentList
        }
        res.send(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        runtimeLog.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
      }
};

module.exports = {getNoteComments};
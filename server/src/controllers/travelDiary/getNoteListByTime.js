const { User } = require('../../models/usersModel')
const { runtimeLog } = require('../../utils/logger');

const getNoteListByTime = async function (req, res) {
    try {
        const { openid, listLength } = req.data;
        if(Object.keys( req.data ).includes(beforeWhen)){
            const { beforeWhen } = req.data;
            const rows = await User.getNoteListByTime(beforeWhen, listLength);
            const noteList = rows.map( obj => {
                if(mediaType === 'video'){
                    return {
                        ...obj,
                        title: noteTitle,
                        coverImg: url,
                        authorNickname: nickname,
                        authorAvatar: avatar
                    };
                }
            })
            res.send({
                status: 200,
                noteList
            })
        } else if
        (Object.keys( req.data ).includes(beforeNoteId)){
            
        }else{
            throw new Error('No noteid nor beforewhen recieved.');
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        runtimeLog.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
      }
};

module.exports = {getNoteListByTime};
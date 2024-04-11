const { Reviewers } = require('../../models/reviewersModel')
const { runtimeLog } = require('../../utils/logger');

const deleteReviewer = async function (req, res) {
    try {
        const { reviewerId } = req.data;
        await Promise.all(reviewerId.map( async obj => {
            Reviewers.dropByReviewerId(obj.reviewerId);
        }));
        const data ={
            status: 200
        }
        res.send(data);
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        runtimeLog.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
      }
};

module.exports = { deleteReviewer };
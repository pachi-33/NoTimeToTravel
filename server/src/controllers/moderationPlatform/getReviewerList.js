const { Reviewers } = require('../../models/reviewersModel')
const { runtimeLog } = require('../../utils/logger');

const getReviewerList = async function (req, res) {
    try {
        const { username, password, reviewerId } = req.data;
        const results = await Reviewers.getReviewerList()
        const data ={
            status: 200,
            reviewerList: results
        }
        res.send(data);
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        runtimeLog.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
      }
};

module.exports = { getReviewerList };
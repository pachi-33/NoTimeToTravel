const {protocol, hostname, port} = require('./hostConfig');

const prefix = protocol + '://' + hostname + ':' + port;
const travelDiary_urls = {
    login: '/nofresh/travelDiary/login',
    getUserInfo: '/travelDiary/verification/getUserInfo',
    setAvatar: '/travelDiary/verification/setAvatar',
    setNickName: '/travelDiary/verification/setNickName',
    getNoteListByTime: '/travelDiary/verification/getNoteListByTime',
    getNoteListBySearchTitle: '/travelDiary/verification/getNoteListBySearchTitle',
    getNoteListBySearchAuthor: '/travelDiary/verification/getNoteListBySearchAuthor',
    getNoteDetails: '/nofresh/travelDiary/getNoteDetails',
    getNoteComments: '/nofresh/travelDiary/getNoteComments',
    likeNote: '/travelDiary/verification/likeNote',
    collectNote: '/travelDiary/verification/collectNote',
    cancelCollectNote: '/travelDiary/verification/cancelCollectNote',
    makeComment: '/travelDiary/verification/makeComment',
    uploadFile: '/travelDiary/verification/uploadFile',
    uploadNote: '/travelDiary/verification/uploadNote',
    modifyNote: '/travelDiary/verification/modifyNote',
    deleteNote: '/travelDiary/verification/deleteNote',
    getMyCollect: '/travelDiary/verification/getMyCollect',
    getMyNoteListWithStatus: '/travelDiary/verification/getMyNoteListWithStatus'
};

const moderationPlatform_urls = {
    login: '/nofresh/moderationPlatform/login',
    getReviewerList: '/moderationPlatform/verification/getReviewerList',
    deleteReviewer: '/moderationPlatform/verification/deleteReviewer',
    registerReviewer:'/moderationPlatform/verification/registerReviewer',
    getNoteInfo:'/moderationPlatform/verification/getNoteInfo',
    approveNote:'/moderationPlatform/verification/approveNote',
    getNoteList:'/moderationPlatform/verification/getNoteList'
};



module.exports = {
    prefix,
    travelDiary_urls,
    moderationPlatform_urls
};
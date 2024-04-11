const express = require('express');
const { prefix, travelDiary_urls, moderationPlatform_urls } = require('./src/config/InterfaceURL');
const { login } = require('../controllers/moderationPlatform/login');
const { getReviewerList } = require('../controllers/moderationPlatform/getReviewerList');
const { deleteReviewer } = require('../controllers/moderationPlatform/deleteReviewer');
const { registerReviewer } = require('../controllers/moderationPlatform/registerReviewer');
const { getNoteInfo } = require('../controllers/moderationPlatform/getNoteInfo');
const { approveNote } = require('../controllers/moderationPlatform/approveNote');
const { getNoteList } = require('../controllers/moderationPlatform/getNoteList');
const reviewRouter = express.Router();



reviewRouter.post(moderationPlatform_urls.login, login);
reviewRouter.get(moderationPlatform_urls.getReviewerList, getReviewerList);
reviewRouter.post(moderationPlatform_urls.deleteReviewer, deleteReviewer);
reviewRouter.post(moderationPlatform_urls.registerReviewer, registerReviewer);
reviewRouter.get(moderationPlatform_urls.getNoteInfo, getNoteInfo);
reviewRouter.post(moderationPlatform_urls.approveNote, approveNote);
reviewRouter.get(moderationPlatform_urls.getNoteList, getNoteList);

module.exports = {reviewRouter};
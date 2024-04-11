const express = require('express');
const {upload, successCallback} = require('../controllers/travelDiary/uploadFile');
const { travelDiary_urls } = require('../config/InterfaceURL');

const uploadRouter = express.Router();

uploadRouter.post(travelDiary_urls.uploadFile, upload.single('avatar'), successCallback);
uploadRouter.post(travelDiary_urls.uploadFile, upload.single('imageFile'), successCallback);
uploadRouter.post(travelDiary_urls.uploadFile, upload.single('videoFile'), successCallback);

module.exports = { uploadRouter };
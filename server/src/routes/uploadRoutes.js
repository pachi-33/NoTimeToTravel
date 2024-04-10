const express = require('express');
const {upload, successCallback} = require('../controllers/travelDiary/uploadFile');
const { url_uploadFile } = require('../config/InterfaceURL');

const uploadRouter = express.Router();

uploadRouter.post(url_uploadFile, upload.single('avatar'), successCallback);
uploadRouter.post(url_uploadFile, upload.single('imageFile'), successCallback);
uploadRouter.post(url_uploadFile, upload.single('videoFile'), successCallback);

module.exports = { uploadRouter };
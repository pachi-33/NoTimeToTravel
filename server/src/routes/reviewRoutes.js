const express = require('express');
const userController = require('../controllers/travelDiary/userController');
const reviewerController = require('../controllers/moderationPlatform/reviewerController');

const router = express.Router();

router.post('/moderationPlatform/login', reviewerController.login);

module.exports = router;
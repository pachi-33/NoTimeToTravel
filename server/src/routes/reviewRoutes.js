const express = require('express');
const userController = require('../controllers/travelDiary/login');
const reviewerController = require('../controllers/moderationPlatform/reviewerController');

const router = express.Router();

router.post('/moderationPlatform/login', reviewerController.login);

module.exports = router;
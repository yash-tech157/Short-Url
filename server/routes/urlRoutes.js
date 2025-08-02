
const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// Shorten a URL
router.post('/url/shorten', urlController.createShortUrl);

// Redirect to original URL
router.get('/:shortUrlCode', urlController.redirectToLongUrl);

// Get all URL stats
router.get('/url/stats', urlController.getAllStats);

// Get single URL stats
router.get('/url/stats/:shortUrlCode', urlController.getSingleStat);

module.exports = router;

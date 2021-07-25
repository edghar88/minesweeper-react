const express = require('express');
const router = express.Router();
const scoresController = require('./controllers/scores.controller');

router.get('/scores', scoresController.getScores);

router.post('/scores', scoresController.saveScore);

module.exports = router;
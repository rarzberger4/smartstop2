const { Router } = require('express');
const controllerNews = require('../controllers/newsController');
const controllerWeather = require('../controllers/weatherController');
const controllerWienerLinien = require('../controllers/wienerLinienController');

const router = Router();

router.get('/weather', controllerWeather.getWeather);
router.get('/news',controllerNews.getNews);
router.get('/wienerlinien/:id', controllerWienerLinien.getTime);

module.exports = router;
const { Router } = require('express');
const controllerNews = require('../controllers/newsController');
const controllerWeather = require('../controllers/weatherController');
const controllerWienerLinien = require('../controllers/wienerLinienController');

const routes = Router();

//MUST: GET, POST, PUT, DELETE
//CAN: PATCH

routes.get('/weather', controllerWeather.getWeather);
routes.get('/news',controllerNews.getNews);

//routes.get('/categories', controller.getCategories);
//routes.post("/categories/:category/books", controller.createBook);
//routes.put("/books/:id", controller.updateBook);
//routes.delete("/books/:id", controller.deleteBook);

module.exports = routes;
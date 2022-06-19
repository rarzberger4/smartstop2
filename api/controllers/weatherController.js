const model = require("../models/weatherModel");

class WeatherController {
    async getWeather(req, res) {
        res.send(await model.getWeather());
    }
}

module.exports = new WeatherController();
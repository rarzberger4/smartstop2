const model = require("../models/weatherModel");

class WeatherController {

    //Methods to be used in routers need to be defined here
    async getWeather(req, res) {
        res.send(await model.getWeather());
    }

}
module.exports = new WeatherController();
const model = require("../models/weatherModel");

class WeatherController {

    //Methods to be used in routers need to be defined here
    getWeather(req, res){
        res.send(model.getWeather());
    }

}
module.exports = new WeatherController();
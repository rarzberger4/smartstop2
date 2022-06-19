const fetch = require("node-fetch");

class Weather{
    constructor(temp, conditionIcon, conditionText, uv) {
        this.temp = temp;
        this.conditionIcon = conditionIcon;
        this.conditionText = conditionText;
        this.uv = uv;
    }
}

class WeatherModel{
    //Methods to add Weather to the webpage
    getWeather(){
        return fetch('https://api.weatherapi.com/v1/current.json?key=5919a75387b14f14be3154456221104&q=Vienna&aqi=no')
            .then(responseWeather => responseWeather.json())
            .then(weather => JSON.parse(weather))
            .then(text => new Weather(text.current.temp_c, text.current.condition.icon, text.current.condition.text, text.current.uv))
    }
}

const model = new WeatherModel();
module.exports = model;
const fetch = require("node-fetch");
const {response} = require("express");

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
    getWeather() {
        return fetch('https://api.weatherapi.com/v1/current.json?key=5919a75387b14f14be3154456221104&q=Vienna&aqi=no')
            .then((responseWeather) => responseWeather.json())
            .then((responseData) => {
                return responseData
            })
    }
}

const model = new WeatherModel();
module.exports = model;
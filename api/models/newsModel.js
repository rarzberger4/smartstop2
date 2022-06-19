const fetch = require("node-fetch");
const key = '91575b8a494a4a2a942befe9c9095a55';

class NewsModel{
    async getNews() {
        return fetch('https://newsapi.org/v2/top-headlines?country=at&category=general&pageSize=5&apiKey='+key)
            .then((responseWeather) => responseWeather.json())
            .then((responseData) => {return responseData})
    }
}

let model = new NewsModel();
module.exports = model;
const model = require("../models/newsModel");

class NewsController {
    async getNews(req, res) {
        res.send(await model.getNews())
    }
}
module.exports = new NewsController();
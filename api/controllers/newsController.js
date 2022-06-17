const model = require("../models/newsModel");

class NewsController {
    getNews(req, res){
        res.send(model.getNewsbyTopic())
    }
}
module.exports = new NewsController();
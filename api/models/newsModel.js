const NewsAPI = require('newsapi');
const key = '91575b8a494a4a2a942befe9c9095a55';

const news = new NewsAPI(key);


class NewsModel{
    getNews(){
        return news.v2.sources({
            q: 'Vienna',
            language: 'en'
        }).then(responseNews => JSON.parse(responseNews))
    }
}
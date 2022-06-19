
window.addEventListener("load", loadWeather);
window.addEventListener("load", loadNews);

function loadWeather() {
    fetch("http://localhost:3000/api/weather")
        .then(responseWeather => responseWeather.json())
        .then(({location, current}) => {
            const city = "Your City: " + `${location.name}`
            const currentTemp = "Current temperature: " + `${current.temp_c}`

            const feelsLike = "Feels like: " + `${current.feelslike_c}`
            const condition = "Condition: " + `${current.condition.text}`
            weather.innerHTML = "<h2>" + "Weather" + "</h2>" + "<br>" +  "<p>" + city + "<br>" + currentTemp + "<br>" + feelsLike + "<br>" + condition + "</p>";
        })
        .catch(e => {
            console.log(`Something went wrong: ${e.type}`);
        })
}

function loadNews() {
    fetch("http://localhost:3000/api/news")
        .then(responseWeather => responseWeather.json())
        .then(({articles}) => articles.forEach(
            article => {
                const title = "<h3>" + `${article.title}` + "</h3>";
                const url = "<a href='" + `${article.url}` + "' target='blank'>" + `${article.url}` + "</a>";
                const tempElement = document.createElement("div");
                tempElement.innerHTML = title;
                document.getElementById("news").appendChild(tempElement.firstChild);
                tempElement.innerHTML = url;
                document.getElementById("news").appendChild(tempElement.firstChild);
            }))
            .catch(e => {
            console.log(`Something went wrong: ${e.type}`);
        })
}
window.addEventListener("load", loadWienerLinien);
window.addEventListener("load", loadWeather);
window.addEventListener("load", loadNews);

function loadWeather() {
    fetch("http://localhost:3000/api/weather/")
        .then(response => response.json())
        .then(({location, current}) => {
            const city = "City: " + `${location.name}`
            const time = `${location.localtime}`
            const currentTemp = "Current temperature: " + `${current.temp_c}` + "°C"
            const feelsLike = "Feels like: " + `${current.feelslike_c}` + "°C"
            const condition = "Condition: " + `${current.condition.text}`
            weather.innerHTML = "<h2>" + "Weather" + "</h2>" + "<br>" +  "<p>" + city + "<br> Time: " + time.substring(11) + "<br>" + currentTemp + "<br>" + feelsLike + "<br>" + condition + "</p>";
        })
        .catch(e => {
            console.log(`Something went wrong: ${e.type}`);
        })
}

function loadNews() {
    fetch("http://localhost:3000/api/news/")
        .then(response => response.json())
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

const id = 22;

function loadWienerLinien() {
    fetch("http://localhost:3000/api/wienerlinien/"+id)
        .then(response => response.json())
        .then(({data}) => {
            const station = "<p> Departure: " + `${data.monitors[0].locationStop.properties.title}` + "<p/>"
            const linienName = "<p> <br> Linie: " + `${data.monitors[0].lines[0].name}` + "<p/>"
            const direction = "<p> <br> Direction: " + `${data.monitors[0].lines[0].towards}` + "<p/>"
            const next = "<p><br>Nächste Abfahrten: <br>" +
                `${data.monitors[0].lines[0].departures.departure[0].departureTime.countdown}` + " min<br>" +
                `${data.monitors[0].lines[0].departures.departure[1].departureTime.countdown}` + " min<br>" +
                `${data.monitors[0].lines[0].departures.departure[2].departureTime.countdown}` + " min</p>"
            const tempElement = document.createElement("div");
            tempElement.innerHTML = station;
            document.getElementById("wienerLinien").appendChild(tempElement.firstChild);
            tempElement.innerHTML = linienName;
            document.getElementById("wienerLinien").appendChild(tempElement.firstChild);
            tempElement.innerHTML = direction;
            document.getElementById("wienerLinien").appendChild(tempElement.firstChild);
            tempElement.innerHTML = next;
            document.getElementById("wienerLinien").appendChild(tempElement.firstChild);

        })
        .catch(e => {
            console.log(`Something went wrong: ${e.type}`);
        })
}

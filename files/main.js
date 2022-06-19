window.addEventListener("load", loadWienerLinien);
window.addEventListener("load", loadWeather);
window.addEventListener("load", loadNews);

function loadWeather() {
    fetch("http://localhost:3000/api/weather/")
        .then(response => response.json())
        .then(({location, current}) => {
            const text = "<p>City: " + `${location.name}` + "<br>" +
                "Time: " + `${location.localtime}`.substring(11) + "<br>" +
                "Current temperature: " + `${current.temp_c}` + "°C" + "<br>" +
                "Feels like: " + `${current.feelslike_c}` + "°C" + "<br>" +
                "Condition: " + `${current.condition.text}` + "<p/>"
            const tempElement = document.createElement("div");
            tempElement.innerHTML = text;
            document.getElementById("weather").appendChild(tempElement.firstChild);
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
        .then(({data}) => data.monitors.forEach(
            monitor => {
                console.log(monitor)
                const station = "<p>Departure: " + `${monitor.locationStop.properties.title}` + "<p/>"
                const linienName = "<p>Line: " + `${monitor.lines[0].name}` + "<p/>"
                const direction = "<p>Direction: " + `${monitor.lines[0].towards}` + "<p/>"
                const next = "<p>Upcomming Departures: <br>" +
                    `${monitor.lines[0].departures.departure[0].departureTime.countdown}` + " min<br>" +
                    `${monitor.lines[0].departures.departure[1].departureTime.countdown}` + " min<br>" +
                    `${monitor.lines[0].departures.departure[2].departureTime.countdown}` + " min</p>"
                const tempElement = document.createElement("div");
                tempElement.innerHTML = station;
                document.getElementById("wienerLinien").appendChild(tempElement.firstChild);
                tempElement.innerHTML = linienName;
                document.getElementById("wienerLinien").appendChild(tempElement.firstChild);
                tempElement.innerHTML = direction;
                document.getElementById("wienerLinien").appendChild(tempElement.firstChild);
                tempElement.innerHTML = next;
                document.getElementById("wienerLinien").appendChild(tempElement.firstChild);
            }))
        .catch(e => {
            console.log(`Something went wrong: ${e.type}`);
        })
}

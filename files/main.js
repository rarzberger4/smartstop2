
window.addEventListener("load", loadWeather);      //loads js after HTML is loaded - else possibility of an error js loading to early

function loadWeather() {
    fetch("http://localhost:3000/api/weather")
        .then(responseWeather => responseWeather.json())
        .then(({location, current}) => {
            const city = "Your City: " + `${location.name}`
            const currentTemp = "Current temperature: " + `${current.temp_c}`

            const feelsLike = "Feels like: " + `${current.feelslike_c}`
            const condition = "Condition: " + `${current.condition.text}`
            /*
            console.log(city)
            console.log(currentTemp)
            console.log(feelsLike)
            console.log(condition)
             */
            weather.innerHTML = "<h2>" + "Weather" + "</h2>" + "<br>" +  "<p>" + city + "<br>" + currentTemp + "<br>" + feelsLike + "<br>" + condition + "</p>";
        })
        .catch(e => {
            console.log(`Something went wrong: ${e.type}`);
        })
}
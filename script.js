        const apiKey = "eec8fc905db98483bfb0c9d77f73356e";
        const weatherInfo = document.getElementById("weatherInfo");
        const loader = document.getElementById("loader");

        function getLocation() {
            if (navigator.geolocation) {
                loader.style.display = 'block';
                navigator.geolocation.getCurrentPosition(fetchWeather, showError);
            } else {
                weatherInfo.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function fetchWeather(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

            fetch(apiURL)
                .then(response => response.json())
                .then(data => {
                    loader.style.display = 'none';
                    const location = data.name;
                    const temperature = data.main.temp;
                    const weatherDescription = data.weather[0].description;

                    weatherInfo.innerHTML = `
                        <h2>Location: ${location}</h2>
                        <p>Temperature: ${temperature}°C</p>
                        <p>Condition: ${weatherDescription}</p>
                    `;
                })
                .catch(error => {
                    loader.style.display = 'none';
                    weatherInfo.innerHTML = "<p class='error-message'>Error fetching weather data.</p>";
                });
        }

        function showError(error) {
            loader.style.display = 'none';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    weatherInfo.innerHTML = "<p class='error-message'>User denied the request for Geolocation.</p>";
                    break;
                case error.POSITION_UNAVAILABLE:
                    weatherInfo.innerHTML = "<p class='error-message'>Location information is unavailable.</p>";
                    break;
                case error.TIMEOUT:
                    weatherInfo.innerHTML = "<p class='error-message'>The request to get user location timed out.</p>";
                    break;
                case error.UNKNOWN_ERROR:
                    weatherInfo.innerHTML = "<p class='error-message'>An unknown error occurred.</p>";
                    break;
            }
        }
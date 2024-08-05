// Gathers search history
let searchHistoryCity = JSON.parse(localStorage.getItem('city'));
let searchHistoryState = JSON.parse(localStorage.getItem('state'))

// Creates arrays if sno searches are in local storage
if (searchHistoryCity === null) {
    searchHistoryCity = [];
};
if (searchHistoryState === null) {
    searchHistoryState = [];
}


// Searchbar element selectors
let searchBar = document.querySelector('#searchbar');
let stateBar = document.querySelector('#searchbar-state');
let searchBtn = $('#city-search');
let quickBtns = $('#quick-btns')

// Current Conditions Slectors
let cityName = document.querySelector('#city-name');
let currentTemp = document.querySelector('#current-temp');
let currentWind = document.querySelector('#current-wind');
let currentHum = document.querySelector('#current-hum');
let currentIcon = document.querySelector('#cur-icon')

// Day 1 selectors
let day1 = document.querySelector('#day1');
let day1Temp = document.querySelector('#d1-temp');
let day1Wind = document.querySelector('#d1-wind');
let day1Hum = document.querySelector('#d1-hum');
let day1Icon = document.querySelector('#d1-icon');

// Day 2 selectors
let day2 = document.querySelector('#day2');
let day2Temp = document.querySelector('#d2-temp');
let day2Wind = document.querySelector('#d2-wind');
let day2Hum = document.querySelector('#d2-hum');
let day2Icon = document.querySelector('#d2-icon');

// Day 3 selectors
let day3 = document.querySelector('#day3');
let day3Temp = document.querySelector('#d3-temp');
let day3Wind = document.querySelector('#d3-wind');
let day3Hum = document.querySelector('#d3-hum');
let day3Icon = document.querySelector('#d3-icon');

// Day 4 selectors
let day4 = document.querySelector('#day4');
let day4Temp = document.querySelector('#d4-temp');
let day4Wind = document.querySelector('#d4-wind');
let day4Hum = document.querySelector('#d4-hum');
let day4Icon = document.querySelector('#d4-icon');

// Day 5 selectors
let day5 = document.querySelector('#day5');
let day5Temp = document.querySelector('#d5-temp');
let day5Wind = document.querySelector('#d5-wind');
let day5Hum = document.querySelector('#d5-hum');
let day5Icon = document.querySelector('#d5-icon');


// Functions to be called

// Creates buttons for previous searches
function renderSearchHistory() {
    for (let i = searchHistoryCity.length - 1; i > -1; i--) {
        // Creates an element
        let prevSearch = document.createElement('button');
        // Edits the element
        prevSearch.classList.add('btn');
        prevSearch.classList.add('btn-dark');
        prevSearch.setAttribute('data-city', searchHistoryCity[i]);
        prevSearch.setAttribute('data-state', searchHistoryState[i]);
        prevSearch.textContent = `${searchHistoryCity[i]}, ${searchHistoryState[i]}`;
        // Adds the element
        quickBtns.append(prevSearch);

    }
}

function handleDisplayWeather() {
    const city = searchBar.value.trim();
    const state = stateBar.value.trim();

    // gathers data and displays it
    getGeo(city, state);

    if (city !== null || state === "state") {
        // Unhides the display to reveal the weather data
        $('.display-main').show();

        // Adds city to search history
        searchHistoryCity.push(city);
        localStorage.setItem('city', JSON.stringify(searchHistoryCity));
        searchHistoryState.push(state);
        localStorage.setItem('state', JSON.stringify(searchHistoryState));

        // Clears the search bar
        searchBar.value = "";
        stateBar.value = "State";

        // Clears search history so it can be repopulated again
        let prevList = document.querySelector('#quick-btns')
        while (prevList.lastElementChild) {
            prevList.removeChild(prevList.lastElementChild);
        };

        // Renders search history again
        renderSearchHistory();
    };
}

function handleQuickSelect(event) {
    const city = event.target.getAttribute('data-city')
    const state = event.target.getAttribute('data-state')

    // Gathers data and displays it
    getGeo(city, state);
}

function getGeo(city, state) {
    const geolocateURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state}&appid=c7a9b3b1a0987d84b297de83399a2f5e`

    // fetches the lat and long for the searched city
    fetch (geolocateURL)
        .then (function (response) {
            if (response.ok) {
                // Changes title in the display box
                cityName.textContent = `Now showing weather data for ${city}, ${state}.`

                response.json().then (function (data) {
                    let lat = data[0].lat;
                    let long = data[0].lon;
                    // runs the getData function
                    getData(lat, long);
                    // Displays the weather data
                    $('.display-main').show();
                }
            )
            } else {
                // Gives an alert if the url doesn't work
                alert(`Error: ${response.cod} No cities found. Please try again.`)
            }
    });
}

function getData(lat, long) {

    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&cnt=50&appid=c7a9b3b1a0987d84b297de83399a2f5e`

    // fetches the weather data and displays it
    fetch (apiURL)
        .then (function (response) {
            if (response.ok) {
                response.json().then (function (data) {
                    // Sets current values
                    currentTemp.textContent = `${data.list[0].main.temp} °F`;
                    currentWind.textContent = `${data.list[0].wind.speed} mph`;
                    currentHum.textContent = `${data.list[0].main.humidity}%`;
                    currentIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`);
                    currentIcon.setAttribute('alt', data.list[0].weather[0].description);

                    // Sets day 1 values
                    day1.textContent = dayjs(data.list[7].dt_txt).format('MMM D');
                    day1Temp.textContent = `${data.list[7].main.temp} °F`;
                    day1Wind.textContent = `${data.list[7].wind.speed} mph`;
                    day1Hum.textContent = `${data.list[7].main.humidity}%`;
                    day1Icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[7].weather[0].icon}@2x.png`);
                    day1Icon.setAttribute('alt', data.list[7].weather[0].description);

                    // Sets day 2 values
                    day2.textContent = dayjs(data.list[15].dt_txt).format('MMM D');
                    day2Temp.textContent = `${data.list[15].main.temp} °F`;
                    day2Wind.textContent = `${data.list[15].wind.speed} mph`;
                    day2Hum.textContent = `${data.list[15].main.humidity}%`;
                    day2Icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[15].weather[0].icon}@2x.png`);
                    day2Icon.setAttribute('alt', data.list[15].weather[0].description);

                    // Sets day 3 values
                    day3.textContent = dayjs(data.list[23].dt_txt).format('MMM D');
                    day3Temp.textContent = `${data.list[23].main.temp} °F`;
                    day3Wind.textContent = `${data.list[23].wind.speed} mph`;
                    day3Hum.textContent = `${data.list[23].main.humidity}%`;
                    day3Icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[23].weather[0].icon}@2x.png`);
                    day3Icon.setAttribute('alt', data.list[23].weather[0].description);

                    // Sets day 4 values
                    day4.textContent = dayjs(data.list[31].dt_txt).format('MMM D');
                    day4Temp.textContent = `${data.list[31].main.temp} °F`;
                    day4Wind.textContent = `${data.list[31].wind.speed} mph`;
                    day4Hum.textContent = `${data.list[31].main.humidity}%`;
                    day4Icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[31].weather[0].icon}@2x.png`);
                    day4Icon.setAttribute('alt', data.list[31].weather[0].description);

                    // Sets day 5 values
                    day5.textContent = dayjs(data.list[39].dt_txt).format('MMM D');
                    day5Temp.textContent = `${data.list[39].main.temp} °F`;
                    day5Wind.textContent = `${data.list[39].wind.speed} mph`;
                    day5Hum.textContent = `${data.list[39].main.humidity}%`;
                    day5Icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[39].weather[0].icon}@2x.png`);
                    day5Icon.setAttribute('alt', data.list[39].weather[0].description);
                }
            )
            } else {
                // Gives an alert if the url doesn't work
                alert(`Error: ${response.cod} No cities found. Please try again.`)
            }
    });



}

// Calling functions and setting click events

// Hides display on page load
$('.display-main').hide();

// Renders Search History on page load
renderSearchHistory()

// runs handleDisplayWeather when the bearch button is clicked
searchBtn.on('click', handleDisplayWeather);

// Runs handleQuickSelect when the previous search results are clicked
quickBtns.on('click', handleQuickSelect);
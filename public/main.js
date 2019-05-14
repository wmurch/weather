const searchCity = () => {
  const cityName = document.querySelector('.city-input').value
  const cityZip = document.querySelector('.zip-input').value
  //console.log(cityName)
  //console.log(cityZip)
  if (cityName || cityZip) {
    if (cityName) {
      // search weather site using input city name
      fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
          cityName +
          '&appid=04edf66be47b6a7f6492012c838c7079'
      )
        .then(results => {
          console.log(results)
          return results.json()
        })
        .then(city => {
          //console.log(city)
          //console.log(city.weather[0].description)
          document.querySelector('.results').textContent =
            ' The weather in ' +
            city.name +
            ' is ' +
            city.weather[0].description
        })
    }
    //search weather site using input city zip code
    else if (cityZip) {
      // search weather site using input city name
      fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
          cityZip +
          '&appid=04edf66be47b6a7f6492012c838c7079'
      )
        .then(results => {
          console.log(results)
          return results.json()
        })
        .then(city => {
          console.log({ city })
          console.log(city.weather[0].description)
          document.querySelector('.results').textContent =
            ' The weather in ' +
            city.name +
            ' is ' +
            city.weather[0].description
        })
      //display results on page
    } else {
      document.querySelector('.results').textContent =
        'sorry the information you entered didnt find a city'
    }
  }
}
const main = () => {
  const status = document.querySelector('.status')
  const mapLink = document.querySelector('.map-link')

  const success = position => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    status.textContent = ''
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`
    console.log(mapLink.textContent)
  }

  const error = () => {
    status.textContent = 'Unable to retrieve your location'
  }

  if (navigator.geolocation) {
    document.querySelector('.location').textContent = 'Locating…'
    navigator.geolocation.getCurrentPosition(success, error)
  } else {
    document.querySelector('.location').textContent =
      'Geolocation is not supported by your browser'
  }
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.search').addEventListener('click', searchCity)

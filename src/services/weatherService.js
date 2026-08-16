const API_KEY = '69e27189cd41d646e6085ce380c91700'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'

export async function getWeatherByCity(city) {
  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  )
  
  if (!response.ok) {
    throw new Error('City not found')
  }
  
  return response.json()
}

export async function getWeatherByCoords(lat, lon) {
  const response = await fetch(
    `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
  
  if (!response.ok) {
    throw new Error('Location not found')
  }
  
  return response.json()
}

export async function getForecastByCoords(lat, lon) {
  const response = await fetch(
    `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )

  if (!response.ok) {
    throw new Error('Forecast is unavailable')
  }

  return response.json()
}

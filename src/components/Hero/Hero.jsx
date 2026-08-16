import { useState } from 'react'
import './Hero.css'
import { getForecastByCoords, getWeatherByCity } from '../../services/weatherService'
import WeatherCard from '../WeatherCard/WeatherCard'
import WeatherDetails from '../WeatherDetails/WeatherDetails'

function Hero({ weatherCards, setWeatherCards }) {
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [forecastLoading, setForecastLoading] = useState(false)
  const [forecastError, setForecastError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    
    if (!searchValue.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await getWeatherByCity(searchValue.trim())
      
      const isDuplicate = weatherCards.some(
        (card) => card.name.toLowerCase() === data.name.toLowerCase()
      )
      
      if (!isDuplicate) {
        setWeatherCards((prev) => [...prev, data])
      }
      
      setSearchValue('')
    } catch (err) {
      setError('City not found. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (cityName) => {
    setWeatherCards((prev) => prev.filter((card) => card.name !== cityName))
    if (selectedCard === cityName) setSelectedCard(null)
  }

  const handleSeeMore = async (card) => {
    if (selectedCard === card.name) {
      setSelectedCard(null)
      return
    }
    setSelectedCard(card.name)
    setForecast(null)
    setForecastError(null)
    setForecastLoading(true)
    try {
      setForecast(await getForecastByCoords(card.coord.lat, card.coord.lon))
    } catch (err) {
      setForecastError('Could not load the forecast. Please try again later.')
    } finally {
      setForecastLoading(false)
    }
  }

  const selectedWeather = weatherCards.find((card) => card.name === selectedCard)

  const handleRefresh = async (cityName) => {
    setLoading(true)
    try {
      const data = await getWeatherByCity(cityName)
      setWeatherCards((prev) =>
        prev.map((card) => (card.name === cityName ? data : card))
      )
    } catch (err) {
      setError('Failed to refresh. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="hero">
        <div className="hero__overlay"></div>
        <div className="hero__content container">
        <h1 className="hero__title">Weather dashboard</h1>
        <div className="hero__info">
          <div className="hero__description">
            Create your personal list of favorite cities and always be aware of the weather.
          </div>
          <div className="hero__date">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}<br />
            {new Date().toLocaleDateString('en-US', { weekday: 'long' })}, {new Date().getDate()}<sup>{getDaySuffix(new Date().getDate())}</sup>
          </div>
        </div>
        <form className="hero__search" onSubmit={handleSearch}>
          <input
            type="text"
            className="hero__input"
            placeholder="Search location..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            disabled={loading}
          />
          <button className="hero__search-btn" type="submit" disabled={loading}>
            {loading ? (
              <span className="hero__loading">...</span>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            )}
          </button>
        </form>
        {error && <div className="hero__error">{error}</div>}
        </div>
      </section>
      {weatherCards.length > 0 && (
        <div className="hero__cards">
          {weatherCards.map((card) => (
            <WeatherCard
              key={card.name}
              data={card}
              onDelete={() => handleDelete(card.name)}
              onRefresh={() => handleRefresh(card.name)}
              onFavorite={() => {}}
              onSeeMore={() => handleSeeMore(card)}
              isSelected={selectedCard === card.name}
            />
          ))}
        </div>
      )}
      {selectedWeather && <WeatherDetails data={selectedWeather} forecast={forecast} loading={forecastLoading} error={forecastError} />}
    </>
  )
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) return 'th'
  switch (day % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}

export default Hero

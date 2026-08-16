import './WeatherCard.css'

function WeatherCard({ data, onDelete, onRefresh, onFavorite, onSeeMore, isSelected }) {
  const date = new Date()
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  const day = date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' })

  return (
    <div className="weather-card">
      <div className="weather-card__header">
        <span className="weather-card__city">{data.name}</span>
        <span className="weather-card__country">{data.sys.country}</span>
      </div>
      <div className="weather-card__time">{time}</div>
      <div className="weather-card__badge">Hourly forecast</div>
      <div className="weather-card__date">
        {day} | {weekday}
      </div>
      <div className="weather-card__icon">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
        />
      </div>
      <div className="weather-card__temp">{Math.round(data.main.temp)}°C</div>
      <div className="weather-card__actions">
        <button className="weather-card__btn weather-card__btn--refresh" onClick={onRefresh} aria-label="Refresh">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 2v6h-6"/>
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
            <path d="M3 22v-6h6"/>
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
          </svg>
        </button>
        <button className="weather-card__btn weather-card__btn--favorite" onClick={onFavorite} aria-label="Favorite">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button
          className="weather-card__btn weather-card__btn--more"
          type="button"
          onClick={onSeeMore}
          aria-expanded={isSelected}
        >
          {isSelected ? 'Hide details' : 'See more'}
        </button>
        <button className="weather-card__btn weather-card__btn--delete" onClick={onDelete} aria-label="Delete">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default WeatherCard

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import './WeatherDetails.css'

const metricCards = [
  { key: 'feels', label: 'Feels like', icon: '🌡️', value: (data) => `${Math.round(data.main.feels_like)}°C` },
  { key: 'min', label: 'Min °C', icon: '↓', value: (data) => `${Math.round(data.main.temp_min)}°C` },
  { key: 'humidity', label: 'Humidity', icon: '💧', value: (data) => `${data.main.humidity}%` },
  { key: 'pressure', label: 'Pressure', icon: '⏲', value: (data) => `${data.main.pressure} hPa` },
  { key: 'wind', label: 'Wind speed', icon: '≋', value: (data) => `${data.wind.speed.toFixed(1)} m/s` },
  { key: 'visibility', label: 'Visibility', icon: '◉', value: (data) => `${(data.visibility / 1000).toFixed(1)} km` },
]

function WeatherDetails({ data, forecast, loading, error }) {
  const chartCanvas = useRef(null)

  useEffect(() => {
    if (!chartCanvas.current || !forecast?.list?.length) return undefined

    const chart = new Chart(chartCanvas.current, {
      type: 'line',
      data: {
        labels: forecast.list.slice(0, 12).map((item) => new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' })),
        datasets: [{ label: 'Temperature', data: forecast.list.slice(0, 12).map((item) => Math.round(item.main.temp)), borderColor: '#ff9f43', backgroundColor: 'rgba(255, 159, 67, 0.16)', fill: true, tension: 0.38, borderWidth: 2, pointRadius: 3, pointBackgroundColor: '#ff9f43' }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { grid: { color: 'rgba(0, 0, 0, .08)' }, ticks: { maxRotation: 0 } }, y: { grid: { color: 'rgba(0, 0, 0, .08)' }, ticks: { callback: (value) => `${value}°` } } },
      },
    })

    return () => chart.destroy()
  }, [forecast])

  const dailyForecast = forecast?.list?.filter((item) => item.dt_txt.includes('12:00:00')) ?? []

  return (
    <section className="weather-details" aria-live="polite">
      <div className="weather-details__heading">
        <div><p className="weather-details__eyebrow">Weather details</p><h2>{data.name}, {data.sys.country}</h2></div>
        <p>{data.weather[0].description}</p>
      </div>
      <div className="weather-details__metrics">
        {metricCards.map((metric) => <article className="weather-details__metric" key={metric.key}><span>{metric.label}</span><strong>{metric.value(data)}</strong><i aria-hidden="true">{metric.icon}</i></article>)}
      </div>
      <article className="weather-details__panel">
        <h3>Hourly forecast</h3>
        {loading && <p className="weather-details__message">Loading forecast…</p>}
        {error && <p className="weather-details__message weather-details__message--error">{error}</p>}
        {!loading && !error && forecast && <div className="weather-details__chart"><canvas ref={chartCanvas} /></div>}
      </article>
      {!loading && !error && dailyForecast.length > 0 && <article className="weather-details__panel"><h3>5-day forecast</h3><div className="weather-details__days">{dailyForecast.map((item) => <div className="weather-details__day" key={item.dt}><span>{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span><img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="" /><strong>{Math.round(item.main.temp_max)}° / {Math.round(item.main.temp_min)}°</strong><span>{item.weather[0].description}</span></div>)}</div></article>}
    </section>
  )
}

export default WeatherDetails

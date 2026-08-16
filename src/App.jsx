import { useState } from 'react'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import News from './components/News/News.jsx'
import Gallery from './components/Gallery/Gallery.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() {
  const [weatherCards, setWeatherCards] = useState([])

  return (
    <div className="app">
      <Header />
      <Hero weatherCards={weatherCards} setWeatherCards={setWeatherCards} />
      <News />
      <Gallery />
      <Footer />
    </div>
  )
}

export default App

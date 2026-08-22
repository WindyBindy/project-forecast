import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, EffectCoverflow, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { getImages } from '../../services/pixabayService'
import './Gallery.css'

const DEFAULT_QUERY = 'mountains'

function Gallery() {
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadImages = async (searchQuery) => {
    setLoading(true)
    setError(null)

    try {
      setImages(await getImages(searchQuery))
    } catch (err) {
      setImages([])
      setError(err.message === 'Pixabay API key is missing'
        ? 'Add VITE_PIXABAY_API_KEY to show images from Pixabay.'
        : 'Could not load images. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadImages(DEFAULT_QUERY) }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const searchQuery = query.trim() || DEFAULT_QUERY
    setQuery(searchQuery)
    loadImages(searchQuery)
  }

  return (
    <section className="gallery" aria-labelledby="gallery-heading">
      <div className="gallery__container container">
        <div className="gallery__heading">
          <h2 id="gallery-heading">Beautiful nature</h2>
          <form className="gallery__search" onSubmit={handleSubmit}>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search images" aria-label="Search images" />
            <button type="submit" disabled={loading}>Search</button>
          </form>
        </div>

        {loading && <p className="gallery__message">Loading images…</p>}
        {error && <p className="gallery__message gallery__message--error">{error}</p>}
        {!loading && !error && images.length === 0 && <p className="gallery__message">No images found.</p>}
        {!loading && !error && images.length > 0 && (
          <Swiper
            className="gallery__swiper"
            modules={[A11y, EffectCoverflow, Keyboard]}
            effect="coverflow"
            centeredSlides
            slidesPerView="auto"
            grabCursor
            keyboard={{ enabled: true }}
            loop={images.length > 3}
            coverflowEffect={{ rotate: 0, stretch: 0, depth: 160, modifier: 1.2, slideShadows: false }}
            a11y={{ prevSlideMessage: 'Previous image', nextSlideMessage: 'Next image' }}
          >
            {images.map((image) => (
              <SwiperSlide className="gallery__slide" key={image.id}>
                <a className="gallery__image" href={image.pageURL} target="_blank" rel="noreferrer">
                  <img src={image.webformatURL} alt={image.tags} />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  )
}

export default Gallery

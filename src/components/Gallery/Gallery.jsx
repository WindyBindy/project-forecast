import { useEffect, useState } from 'react'
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
          <div className="gallery__images">
            {images.map((image, index) => (
              <a className={`gallery__image gallery__image--${index + 1}`} href={image.pageURL} target="_blank" rel="noreferrer" key={image.id}>
                <img src={image.webformatURL} alt={image.tags} />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery

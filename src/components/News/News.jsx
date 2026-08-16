import { useEffect, useState } from 'react'
import { getTopHeadlines } from '../../services/newsService'
import './News.css'

const INITIAL_NEWS_COUNT = 4

function News() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    let isCurrent = true

    async function loadNews() {
      try {
        const data = await getTopHeadlines()
        if (isCurrent) setArticles(data)
      } catch {
        if (isCurrent) setError(true)
      } finally {
        if (isCurrent) setLoading(false)
      }
    }

    loadNews()
    return () => { isCurrent = false }
  }, [])

  const visibleArticles = showAll ? articles : articles.slice(0, INITIAL_NEWS_COUNT)

  return (
    <section className="news" aria-labelledby="news-heading">
      <div className="news__container container">
        <h2 id="news-heading" className="news__title">Latest news</h2>

        {loading && <p className="news__message">Loading news…</p>}
        {error && <p className="news__message news__message--error">Could not load the news. Please try again later.</p>}

        {!loading && !error && (
          <>
            <div className="news__grid">
              {visibleArticles.map((article) => (
                <a className="news-card" href={article.url} target="_blank" rel="noreferrer" key={article.url}>
                  <img
                    className="news-card__image"
                    src={article.image || '/project-forecast/hero-background.png'}
                    alt=""
                    onError={(event) => { event.currentTarget.src = '/project-forecast/hero-background.png' }}
                  />
                  <h3 className="news-card__title">{article.title}</h3>
                  {article.source?.name && <p className="news-card__source">{article.source.name}</p>}
                </a>
              ))}
            </div>

            {articles.length === 0 && <p className="news__message">No news available right now.</p>}
            {articles.length > INITIAL_NEWS_COUNT && (
              <button className="news__more" type="button" onClick={() => setShowAll((value) => !value)}>
                {showAll ? 'Show less' : 'See more'}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default News

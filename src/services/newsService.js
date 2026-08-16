const API_KEY = 'c0fc6acf-254f-40e2-bde9-f4fb497d29be'
const NEWS_URL = 'https://content.guardianapis.com/search'

export async function getTopHeadlines() {
  const params = new URLSearchParams({
    'order-by': 'newest',
    'page-size': '8',
    'show-fields': 'thumbnail',
    'api-key': API_KEY,
  })

  const response = await fetch(`${NEWS_URL}?${params}`)

  if (!response.ok) {
    throw new Error('News are unavailable')
  }

  const { response: data } = await response.json()

  return (data?.results ?? []).map((article) => ({
    url: article.webUrl,
    title: article.webTitle,
    image: article.fields?.thumbnail,
    source: { name: article.sectionName },
  }))
}

const API_URL = 'https://pixabay.com/api/'

export async function getImages(query) {
  const apiKey = "54040935-96888b09b5fdec7a1aacd0c2b"

  if (!apiKey) {
    throw new Error('Pixabay API key is missing')
  }

  const params = new URLSearchParams({
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '7',
  })
  const response = await fetch(`${API_URL}?${params}`)

  if (!response.ok) {
    throw new Error('Images are unavailable')
  }

  const { hits = [] } = await response.json()
  return hits
}

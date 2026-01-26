const DEFAULT_API_BASE = 'http://localhost:8080'

const ACTION_ENDPOINTS = {
  flashcards: '/flashcards',
  mcq: '/quiz',
  summary: '/summarise',
  theory: '/theoryAns',
}

function getApiBase() {
  // Optional: set VITE_API_BASE_URL in .env (e.g. http://localhost:3000)
  return (import.meta?.env?.VITE_API_BASE_URL ?? DEFAULT_API_BASE).toString()
}

export function buildGenerateUrl(actionKey, notes) {
  const endpoint = ACTION_ENDPOINTS[actionKey]
  if (!endpoint) {
    throw new Error(`Unknown action: ${actionKey}`)
  }

  const url = new URL(getApiBase() + endpoint, window.location.origin)

  // GET request: send notes as a query string.
  // Warning: very large notes may exceed URL limits depending on browser/server.
  url.searchParams.set('notes', notes)

  return url.toString()
}

export async function generateFromNotes({ actionKey, notes, signal }) {
  const url = buildGenerateUrl(actionKey, notes)

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain;q=0.9, */*;q=0.8',
    },
    signal,
  })

  const contentType = response.headers.get('content-type') ?? ''
  const isJson = contentType.includes('application/json')

  const data = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const details = typeof data === 'string' ? data : JSON.stringify(data)
    throw new Error(`Request failed (${response.status}): ${details}`)
  }

  return data
}

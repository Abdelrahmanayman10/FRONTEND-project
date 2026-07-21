const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL
  if (envUrl) {
    return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl
  }
  return '/api'
}

export const API_BASE_URL = getBaseUrl()

export async function apiFetch(endpoint, options = {}) {
  const storedAuth = localStorage.getItem('auth')
  let token = null
  if (storedAuth) {
    try {
      const parsed = JSON.parse(storedAuth)
      token = parsed.token
    } catch (e) {
      console.error('Failed to parse auth token from localStorage', e)
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const url = `${API_BASE_URL}${cleanEndpoint}`

  const response = await fetch(url, {
    ...options,
    headers,
  })

  const contentType = response.headers.get('content-type')
  let data = null
  if (contentType && contentType.includes('application/json')) {
    data = await response.json()
  } else {
    data = await response.text()
  }

  if (!response.ok) {
    const errorMsg =
      (data && typeof data === 'object' && (data.message || data.error)) ||
      `Request failed with status ${response.status}`
    const error = new Error(errorMsg)
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

export const api = {
  get: (url, options) => apiFetch(url, { method: 'GET', ...options }),
  post: (url, body, options) => apiFetch(url, { method: 'POST', body: JSON.stringify(body), ...options }),
  put: (url, body, options) => apiFetch(url, { method: 'PUT', body: JSON.stringify(body), ...options }),
  patch: (url, body, options) => apiFetch(url, { method: 'PATCH', body: JSON.stringify(body), ...options }),
  delete: (url, options) => apiFetch(url, { method: 'DELETE', ...options }),
}

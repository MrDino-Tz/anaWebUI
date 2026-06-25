const CONFIG = {
  backendUrl: localStorage.getItem('ana_backend_url') || 'http://192.168.1.126:8000',
  persona: 'default',
  language: 'auto',
}

export function updateConfig(key, value) {
  CONFIG[key] = value
  if (key === 'backendUrl') {
    localStorage.setItem('ana_backend_url', value)
  }
}

export default CONFIG

const CONFIG = {
  backendUrl: localStorage.getItem('ana_backend_url') || 'https://thirstiest-divina-noncentrally.ngrok-free.dev',
  // Alternative (VPS): 'http://162.0.224.233:8080',
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

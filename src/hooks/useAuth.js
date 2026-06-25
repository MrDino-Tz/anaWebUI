import { useState, useCallback, useEffect } from 'react'
import CONFIG from '../config'

function loadAuth() {
  try {
    const raw = localStorage.getItem('ana_auth')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveAuth(auth) {
  if (auth) {
    localStorage.setItem('ana_auth', JSON.stringify(auth))
  } else {
    localStorage.removeItem('ana_auth')
  }
}

export function useAuth() {
  const [user, setUser] = useState(loadAuth)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const stored = loadAuth()
    if (stored) setUser(stored)
  }, [])

  const apiCall = useCallback(async (endpoint, body) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${CONFIG.backendUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.detail || `HTTP ${res.status}`)
      }
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (username, password, email = '') => {
    const data = await apiCall('/api/auth/register', { username, password, email })
    const authData = { username: data.username, email: data.email, token: data.token, device_id: data.device_id, avatar_url: data.avatar_url || '', display_name: data.display_name || data.username }
    saveAuth(authData)
    setUser(authData)
    return authData
  }, [apiCall])

  const login = useCallback(async (username, password) => {
    const data = await apiCall('/api/auth/login', { username, password })
    const authData = { username: data.username, token: data.token, device_id: data.device_id, email: data.email || '', avatar_url: data.avatar_url || '', display_name: data.display_name || data.username }
    saveAuth(authData)
    setUser(authData)
    return authData
  }, [apiCall])

  const logout = useCallback(() => {
    saveAuth(null)
    setUser(null)
    setError('')
  }, [])

  return { user, loading, error, register, login, logout, isAuthenticated: !!user }
}

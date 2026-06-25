import CONFIG from '../config'

function authHeaders(token) {
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

export async function sendAudioToBackend(blob, history = [], model = '', token = '', username = '', deviceId = '') {
  const formData = new FormData()
  formData.append('file', blob, 'recording.webm')
  formData.append('persona', CONFIG.persona)
  formData.append('language', CONFIG.language)
  formData.append('model', model)
  if (username) formData.append('username', username)
  if (deviceId) formData.append('device_id', deviceId)
  if (history.length > 0) {
    formData.append('history_json', JSON.stringify(history))
  }

  const headers = authHeaders(token)
  const res = await fetch(`${CONFIG.backendUrl}/api/ana/voice`, {
    method: 'POST',
    headers,
    body: formData,
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`HTTP ${res.status}: ${err}`)
  }

  return res.json()
}

export async function sendTextToBackend(text, conversationId = null, model = '', token = '', username = '', deviceId = '') {
  const body = {
    message: text,
    persona: CONFIG.persona,
    language: CONFIG.language,
    conversation_id: conversationId,
    model: model,
  }
  if (username) body.username = username
  if (deviceId) body.device_id = deviceId

  const headers = { 'Content-Type': 'application/json', ...authHeaders(token) }
  const res = await fetch(`${CONFIG.backendUrl}/api/ana/chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`HTTP ${res.status}: ${err}`)
  }

  return res.json()
}

export async function sendImageToBackend(file, text = '', model = '', token = '', username = '', deviceId = '') {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('message', text)
  formData.append('persona', CONFIG.persona)
  formData.append('model', model)
  if (username) formData.append('username', username)
  if (deviceId) formData.append('device_id', deviceId)

  const headers = authHeaders(token)
  const res = await fetch(`${CONFIG.backendUrl}/api/ana/vision`, {
    method: 'POST',
    headers,
    body: formData,
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`HTTP ${res.status}: ${err}`)
  }

  return res.json()
}

export async function fetchPersonas(token = '') {
  try {
    const headers = authHeaders(token)
    const res = await fetch(`${CONFIG.backendUrl}/api/personas`, { headers })
    if (res.ok) return res.json()
    return []
  } catch {
    return []
  }
}

export async function fetchModels(token = '') {
  try {
    const headers = authHeaders(token)
    const res = await fetch(`${CONFIG.backendUrl}/api/models`, { headers })
    if (res.ok) return res.json()
    return []
  } catch {
    return []
  }
}

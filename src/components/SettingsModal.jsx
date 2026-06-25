import { useState, useEffect } from 'react'
import CONFIG, { updateConfig } from '../config'
import { fetchPersonas } from '../hooks/useBackend'

export default function SettingsModal({ open, onClose, conversationId }) {
  const [url, setUrl] = useState(CONFIG.backendUrl)
  const [persona, setPersona] = useState(CONFIG.persona)
  const [language, setLanguage] = useState(CONFIG.language)
  const [personas, setPersonas] = useState([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (open) {
      setUrl(CONFIG.backendUrl)
      setPersona(CONFIG.persona)
      setLanguage(CONFIG.language)
      setSaved(false)
      fetchPersonas().then(setPersonas)
    }
  }, [open])

  const handleSave = () => {
    updateConfig('backendUrl', url)
    updateConfig('persona', persona)
    updateConfig('language', language)
    setSaved(true)
    setTimeout(() => {
      onClose()
      setSaved(false)
    }, 600)
  }

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={handleBackdrop}>
      <div className="modal">
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {/* Backend URL */}
          <label className="modal-label">
            Backend URL
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="modal-input"
              placeholder="http://192.168.1.x:8000"
              spellCheck={false}
            />
          </label>

          {/* Persona */}
          <label className="modal-label">
            Persona
            <select value={persona} onChange={(e) => setPersona(e.target.value)} className="modal-input">
              {personas.length === 0
                ? <option value="default">Default</option>
                : personas.map(p => (
                    <option key={p.name} value={p.name}>{p.label || p.name}</option>
                  ))
              }
            </select>
          </label>

          {/* Language */}
          <label className="modal-label">
            Language
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="modal-input">
              <option value="auto">Auto-detect</option>
              <option value="english">English</option>
              <option value="swahili">Swahili</option>
            </select>
          </label>

          {/* Conversation ID */}
          {conversationId && (
            <div className="modal-info">
              <span style={{ color: 'var(--text-muted)' }}>Active session: </span>
              <code>{conversationId.slice(0, 20)}…</code>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="modal-btn" onClick={handleSave}>
            {saved ? '✓ Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

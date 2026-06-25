import { useState, useRef, useEffect } from 'react'

const MAX_CHARS = 1000
const WAVEFORM = [3, 8, 14, 20, 24, 18, 12, 22, 16, 8, 20, 26, 14, 10, 18, 6]

export default function InputBar({ onTextSend, isRecording, onStartRecording, onStopRecording, disabled }) {
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!isRecording && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isRecording])

  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [text])

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (!trimmed || disabled || trimmed.length > MAX_CHARS) return
    onTextSend(trimmed)
    setText('')
    if (inputRef.current) inputRef.current.style.height = 'auto'
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const canSend = (text.trim().length > 0 || pendingImage) && !disabled

  return (
    <div className="input-wrap">
      <div className={`input-box ${isRecording ? 'input-box--rec' : ''}`}>
        
        {isRecording ? (
          <div className="rec-state">
            <div className="rec-left">
              <span className="rec-dot" />
              <span className="rec-label">Listening…</span>
              <div className="rec-wave" aria-hidden>
                {WAVEFORM.map((h, i) => (
                  <div key={i} className="rec-bar" style={{ '--bh': `${h}px`, '--bd': `${i * 0.07}s` }} />
                ))}
              </div>
            </div>
            <button className="rec-stop" onClick={onStopRecording}>Stop</button>
          </div>
        ) : (
          <>
            <div className="input-row1">
              <div className="input-attach">
                <button className="attach-btn" title="Add Image">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </button>
                <button className="attach-btn" title="File">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                </button>
              </div>
              <textarea
                ref={inputRef}
                className="input-ta"
                placeholder="Ask ANA anything..."
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                rows={1}
              />
            </div>

            <div className="input-row2">
              <div className="input-r2-left">
                <button className="model-pill">
                  <span className="g-icon">A</span>
                  ANA Model Pro
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                <div className="config-pill">⚡ 4.3</div>
                <div className="config-pill">💎 1K</div>
                <div className="config-pill">Unlimited <span style={{fontSize:'8px'}}>●●</span></div>
              </div>

              <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                <button
                  type="button"
                  className="mic-btn2"
                  onMouseDown={onStartRecording}
                  onMouseUp={onStopRecording}
                  onMouseLeave={isRecording ? onStopRecording : undefined}
                  onTouchStart={(e) => { e.preventDefault(); onStartRecording() }}
                  onTouchEnd={(e) => { e.preventDefault(); onStopRecording() }}
                  disabled={disabled}
                  title="Hold to voice"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
                </button>
                <button className="gen-btn" onClick={handleSubmit} disabled={!canSend}>
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                  Generate
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {!isRecording && (
        <>
          {/* Feature Pills */}
          <div className="feature-pills" style={{marginTop:'16px'}}>
            <span className="feature-pill">✨ AI for Real Work</span>
            <span className="feature-pill">📋 Smart Summaries</span>
            <span className="feature-pill">🔬 Ask Anything, Get Results</span>
            <span className="feature-pill">⚡ Fast, Private, Reliable</span>
          </div>
          <p className="input-hint">
            Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line
          </p>
        </>
      )}
    </div>
  )
}

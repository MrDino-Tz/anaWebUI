import { useEffect, useRef } from 'react'
import FaceCanvas from './FaceCanvas'
import MarkdownRenderer from './MarkdownRenderer'

export default function ChatView({ messages, isProcessing, status, isRecording }) {
  const endRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isProcessing])

  return (
    <div className="chat-view">
      <div className="chat-header">
        <FaceCanvas
          canvasRef={canvasRef}
          status={status}
          isRecording={isRecording}
          className="face-canvas-sm"
          width={100}
          height={50}
        />
        <div>
          <div className="chat-header-name">ANA</div>
          <div className="chat-header-status">
            <span className={`status-dot ${status}`} />
            <span className="chat-header-label">
              {status === 'idle' ? 'Ready' : status === 'processing' ? 'Thinking...' : status === 'speaking' ? 'Speaking...' : status === 'listening' ? 'Listening...' : 'Error'}
            </span>
          </div>
        </div>
      </div>

      <div className="chat-scroll">
        <div className="chat-inner">
          {messages.map((msg) => (
            <div key={msg.id} className={`message message-${msg.type}`}>
              {msg.type === 'ana' && (
                <div className="message-avatar">A</div>
              )}
              <div className="message-content">
                {msg.image && (
                  <img
                    src={URL.createObjectURL(msg.image)}
                    alt="Uploaded"
                    className="message-image"
                  />
                )}
                <div className="message-text">
                  {msg.type === 'ana' ? (
                    <MarkdownRenderer content={msg.text} />
                  ) : (
                    msg.text
                  )}
                </div>
                <div className="message-time">{msg.time}</div>
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="typing-indicator">
              <div className="typing-avatar">A</div>
              <div className="typing-dots">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>
      </div>
    </div>
  )
}

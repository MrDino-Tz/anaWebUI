import { useState, useCallback, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ChatFusionDemo from './components/ChatFusionDemo'
import SettingsModal from './components/SettingsModal'
import { useAuth } from './hooks/useAuth'
import { useAudioRecorder } from './hooks/useAudioRecorder'
import { useAudioPlayback } from './hooks/useAudioPlayback'
import { sendAudioToBackend, sendTextToBackend, sendImageToBackend } from './hooks/useBackend'

function storageKey(username) {
  return username ? `ana_conversations_${username}` : 'ana_conversations_anonymous'
}

function loadConversations(username) {
  try {
    const raw = localStorage.getItem(storageKey(username))
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveConversations(convs, username) {
  localStorage.setItem(storageKey(username), JSON.stringify(convs))
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export default function App() {
  const navigate = useNavigate()
  const { user, loading, error, login, register, logout, isAuthenticated } = useAuth()
  const usernameRef = useRef(isAuthenticated ? user.username : null)
  const [conversations, setConversations] = useState(() => loadConversations(usernameRef.current))
  const [activeConvId, setActiveConvId] = useState(null)
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState('idle')
  const [isProcessing, setIsProcessing] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState(() => localStorage.getItem('ana_selected_model') || 'ana-moon-v1')
  const msgId = useRef(0)

  // Switch conversation namespace when user changes
  useEffect(() => {
    const name = isAuthenticated ? user.username : null
    usernameRef.current = name
    setConversations(loadConversations(name))
    setActiveConvId(null)
    setMessages([])
    msgId.current = 0
  }, [isAuthenticated, user])

  // Load active conversation messages
  useEffect(() => {
    if (activeConvId) {
      const conv = conversations.find(c => c.id === activeConvId)
      if (conv) {
        setMessages(conv.messages || [])
        msgId.current = conv.messages.length
        return
      }
    }
    setMessages([])
    msgId.current = 0
  }, [activeConvId, conversations])

  const persistConv = useCallback((msgs) => {
    if (msgs.length === 0) return
    setConversations(prev => {
      const prefix = user?.username ? `${user.username}: ` : ''
      const rawTitle = msgs.find(m => m.type === 'user' && m.text && m.text !== '🎤 Voice message' && !m.text.startsWith('📷'))?.text || `Chat ${new Date().toLocaleDateString()}`
      const maxLen = 60 - prefix.length
      const title = prefix + rawTitle.slice(0, Math.max(maxLen, 20))
      const existing = prev.findIndex(c => c.id === activeConvId)
      const entry = { id: activeConvId || generateId(), title: title.slice(0, 60), messages: msgs, time: new Date().toISOString() }
      const next = existing >= 0
        ? prev.map((c, i) => i === existing ? entry : c)
        : [entry, ...prev]
      saveConversations(next.slice(0, 50), usernameRef.current)
      if (!activeConvId) setActiveConvId(entry.id)
      return next
    })
  }, [activeConvId, user])

  const addMessage = useCallback((type, text, image = null, attachments = []) => {
    msgId.current += 1
    const newMsg = { id: msgId.current, type, text, image, attachments, time: new Date().toLocaleTimeString() }
    setMessages(prev => {
      const updated = [...prev, newMsg]
      setTimeout(() => persistConv(updated), 0)
      return updated
    })
  }, [persistConv])

  const { playBase64Audio } = useAudioPlayback()

  const messagesToHistory = useCallback((msgs) => {
    return msgs
      .filter(m => m.text && m.text !== '🎤 Voice message' && !m.text.startsWith('⚠'))
      .map(m => ({
        role: m.type === 'user' ? 'user' : 'assistant',
        content: m.text.replace(/^🎤\s*/, '')
      }))
  }, [])

  const onResult = useCallback(async (data) => {
    setIsProcessing(false)
    if (data.status === 'error') {
      setStatus('error')
      addMessage('ana', `⚠ ${data.response || data.message}`)
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    setStatus('speaking')
    addMessage('ana', data.response)

    setTimeout(() => setStatus('idle'), 2000)
  }, [addMessage])

  const handleAudioSend = useCallback(async (blob) => {
    setStatus('processing')
    setIsProcessing(true)
    try {
      const history = messagesToHistory(messages)
      const token = user?.token
      const data = await sendAudioToBackend(blob, history, selectedModel, token, user?.username, user?.device_id)
      if (data.transcript) {
        addMessage('user', `🎤 ${data.transcript}`)
      }
      if (data.audio_base64) {
        playBase64Audio(data.audio_base64)
      }
      await onResult(data)
    } catch (err) {
      setIsProcessing(false)
      setStatus('error')
      addMessage('ana', `⚠ Connection error: ${err.message}`)
      setTimeout(() => setStatus('idle'), 3000)
    }
  }, [addMessage, onResult, messages, selectedModel, messagesToHistory, playBase64Audio, user])

  const handleTextSend = useCallback(async (data) => {
    const text = data.message;
    const attachments = data.attachments || [];
    const model = data.model || selectedModel;
    if (!text && attachments.length === 0) return;

    setStatus('processing')
    setIsProcessing(true)

    const imageAtt = attachments.find(a => a.type === 'image' || (a.file && a.file.type && a.file.type.startsWith('image/')));
    const token = user?.token
    const uname = user?.username || ''

    if (imageAtt && imageAtt.file) {
      const storedAttachments = attachments.map(({ name, type, url }) => ({ name, type, url }))
      addMessage('user', text || '📷 Image', null, storedAttachments)
      try {
        const responseData = await sendImageToBackend(imageAtt.file, text || '', model, token, uname, user?.device_id)
        await onResult(responseData)
      } catch (err) {
        setIsProcessing(false)
        setStatus('error')
        addMessage('ana', `⚠ Connection error: ${err.message}`)
        setTimeout(() => setStatus('idle'), 3000)
      }
      return
    }

    const storedAttachments = attachments.map(({ name, type, url }) => ({ name, type, url }))
    addMessage('user', text, null, storedAttachments)
    try {
      const responseData = await sendTextToBackend(text, activeConvId, model, token, uname, user?.device_id)
      await onResult(responseData)
    } catch (err) {
      setIsProcessing(false)
      setStatus('error')
      addMessage('ana', `⚠ Connection error: ${err.message}`)
      setTimeout(() => setStatus('idle'), 3000)
    }
  }, [addMessage, onResult, activeConvId, selectedModel, user])

  const handleModelChange = useCallback((model) => {
    setSelectedModel(model)
    localStorage.setItem('ana_selected_model', model)
  }, [])

  const handleNewChat = useCallback(() => {
    if (messages.length > 0) persistConv(messages)
    setActiveConvId(null)
    setMessages([])
    setStatus('idle')
    msgId.current = 0
  }, [messages, persistConv])

  const handleSelectConversation = useCallback((id) => {
    if (messages.length > 0) persistConv(messages)
    setActiveConvId(id)
    setStatus('idle')
  }, [messages, persistConv])

  const handleDeleteConversation = useCallback((id) => {
    setConversations(prev => {
      const next = prev.filter(c => c.id !== id)
      saveConversations(next, usernameRef.current)
      return next
    })
    if (activeConvId === id) {
      setActiveConvId(null)
      setMessages([])
    }
  }, [activeConvId])

  const handleClearConversations = useCallback(() => {
    setConversations([])
    saveConversations([], usernameRef.current)
    setActiveConvId(null)
    setMessages([])
    msgId.current = 0
  }, [])

  const handleLogout = useCallback(() => {
    logout()
    navigate('/signin', { replace: true })
  }, [logout, navigate])

  const { isRecording, startRecording, stopRecording } = useAudioRecorder(
    handleAudioSend, setStatus
  )

  return (
    <div className="h-screen w-full overflow-hidden bg-bg-0">
      <ChatFusionDemo 
        messages={messages} 
        onSendMessage={handleTextSend} 
        onNewChat={handleNewChat}
        onSettingsClick={() => setSettingsOpen(true)}
        isProcessing={isProcessing}
        status={status}
        startRecording={startRecording}
        stopRecording={stopRecording}
        isRecording={isRecording}
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        onClearConversations={handleClearConversations}
        user={isAuthenticated ? user : null}
        onLogout={isAuthenticated ? handleLogout : undefined}
      />
      {settingsOpen && <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />}
    </div>
  )
}

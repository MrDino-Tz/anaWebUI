import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Mic, Square } from 'lucide-react'
import FaceCanvas from './FaceCanvas'
import MarkdownRenderer from './MarkdownRenderer'

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

interface Message {
  id: number
  type: 'user' | 'ana'
  text: string
  time: string
}

interface VoiceChatViewProps {
  messages: Message[]
  isProcessing: boolean
  status: string
  isRecording: boolean
  startRecording: () => void
  stopRecording: () => void
  onExitVoiceMode: () => void
}

function WaveformBars({ active, color }: { active: boolean; color: string }) {
  const [heights, setHeights] = useState<number[]>([])

  useEffect(() => {
    if (!active) {
      setHeights([])
      return
    }
    const bars = 32
    setHeights(Array.from({ length: bars }, () => 4 + Math.random() * 24))

    const interval = setInterval(() => {
      setHeights(Array.from({ length: bars }, () => 4 + Math.random() * 28))
    }, 120)

    return () => clearInterval(interval)
  }, [active])

  if (heights.length === 0) {
    return (
      <div className="flex items-center justify-center gap-[3px] h-12">
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} className="w-[3px] h-1 rounded-full bg-bg-300" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-[3px] h-12">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full transition-all duration-[120ms]"
          style={{ height: `${h}px`, backgroundColor: color }}
        />
      ))}
    </div>
  )
}

export default function VoiceChatView({
  messages,
  isProcessing,
  status,
  isRecording,
  startRecording,
  stopRecording,
  onExitVoiceMode,
}: VoiceChatViewProps) {
  const endRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const recognitionRef = useRef<any>(null)
  const [liveTranscript, setLiveTranscript] = useState('')

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, liveTranscript])

  // Start/stop SpeechRecognition alongside audio recording
  useEffect(() => {
    if (isRecording) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true

        // Detect language from last few messages
        const lastMsgs = messages.slice(-4)
        const hasSwahili = lastMsgs.some(m =>
          /(habari|jambo|sijambo|shikamoo|marahaba|asante|tafadhali|samahani|ndio|hapana|sawa|kwa heri|lala|nzuri|mzuri|kiswahili|naam)/i.test(m.text)
        )
        recognition.lang = hasSwahili ? 'sw-TZ' : 'en-US'

        recognition.onresult = (event: any) => {
          let interim = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              interim += transcript
            } else {
              interim += transcript
            }
          }
          setLiveTranscript(interim)
        }

        recognition.onerror = () => {
          // Speech API not available, silently fall back to audio-only
        }

        recognition.start()
        recognitionRef.current = recognition
      }
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
        recognitionRef.current = null
      }
      setLiveTranscript('')
    }
  }, [isRecording])

  const voiceMessages = messages.filter(
    m => m.text && (m.text.startsWith('🎤') || m.type === 'ana')
  )

  const waveformActive = isRecording || status === 'speaking'
  const waveformColor = isRecording ? '#ffffff' : '#22c55e'

  return (
    <div className="flex-1 flex flex-col h-full bg-bg-0">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-bg-200">
        <button
          onClick={onExitVoiceMode}
          className="p-2 text-text-300 hover:text-text-100 hover:bg-bg-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-bg-200 flex items-center justify-center overflow-hidden">
            <img src="/ana-logo.png" alt="Ana" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-[14px] font-medium text-text-100">Voice Chat</div>
            <div className="text-[11px] text-text-300">
              {status === 'listening' ? 'Listening...' :
               status === 'processing' ? 'Processing...' :
               status === 'speaking' ? 'Speaking...' :
               status === 'error' ? 'Error' : 'Tap the mic to talk'}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4">
        {voiceMessages.length === 0 && !isRecording ? (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <FaceCanvas
              canvasRef={canvasRef}
              status={status}
              isRecording={isRecording}
              className="w-32 h-32"
              width={160}
              height={160}
            />
            <p className="text-text-300 text-[14px] text-center max-w-[260px]">
              Tap the mic below and start talking to Ana
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {voiceMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex w-full ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.type === 'ana' && (
                  <div className="w-8 h-8 rounded-full bg-bg-200 border border-bg-300 flex items-center justify-center mr-3 mt-1 shrink-0 overflow-hidden">
                    <img src="/ana-logo.png" alt="Ana" className="w-full h-full object-cover" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-3 text-[14px] leading-relaxed ${
                    msg.type === 'user'
                      ? 'bg-bg-200 text-text-100 rounded-br-sm'
                      : 'bg-transparent text-text-100 rounded-bl-sm'
                  }`}
                >
                  {msg.type === 'ana' ? (
                    <MarkdownRenderer content={msg.text} />
                  ) : (
                    <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                  )}
                  <div className="text-[10px] text-text-300 mt-1">{msg.time}</div>
                </div>
              </div>
            ))}

            {/* Live transcript bubble */}
            {isRecording && liveTranscript && (
              <div className="flex w-full justify-end animate-fade-in">
                <div className="max-w-[85%] rounded-lg px-4 py-3 text-[14px] leading-relaxed bg-bg-200 text-text-100 rounded-br-sm opacity-80">
                  <p>{liveTranscript}</p>
                  <span className="inline-block w-1.5 h-4 ml-0.5 bg-text-300 animate-pulse" />
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="flex w-full justify-start">
                <div className="w-8 h-8 rounded-full bg-bg-200 border border-bg-300 flex items-center justify-center mr-3 mt-1 shrink-0 overflow-hidden">
                  <img src="/ana-logo.png" alt="Ana" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-2 px-4 py-3">
                  <div className="w-2 h-2 bg-text-300 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-text-300 rounded-full animate-pulse delay-75" />
                  <div className="w-2 h-2 bg-text-300 rounded-full animate-pulse delay-150" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        )}
      </div>

      {/* Voice Visualizer + Mic */}
      <div className="px-4 pb-6 pt-2 flex flex-col items-center gap-4">
        <WaveformBars active={waveformActive} color={waveformColor} />

        {/* Mic Button */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
            isRecording
              ? 'bg-red-500 scale-110 shadow-[0_0_40px_rgba(239,68,68,0.5)]'
              : 'bg-white text-black hover:scale-105 shadow-lg'
          }`}
        >
          {isRecording ? (
            <Square className="w-7 h-7 text-white fill-white" />
          ) : (
            <Mic className="w-7 h-7" />
          )}
        </button>

        <div className="text-[11px] text-text-300 text-center">
          {isRecording
            ? 'Tap to stop recording'
            : isProcessing
            ? 'Waiting for Ana...'
            : 'Tap to start speaking'}
        </div>
      </div>
    </div>
  )
}

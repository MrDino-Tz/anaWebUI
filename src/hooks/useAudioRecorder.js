import { useState, useRef, useCallback } from 'react'

export function useAudioRecorder(onAudioReady, setStatus) {
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const streamRef = useRef(null)

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm'

      const recorder = new MediaRecorder(stream, { mimeType })
      mediaRecorderRef.current = recorder
      chunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        const blob = new Blob(chunksRef.current, { type: mimeType })
        // NOTE: do NOT add a message here — App.jsx handles it in handleAudioSend
        setIsRecording(false)
        await onAudioReady(blob)
      }

      recorder.start()
      setIsRecording(true)
      setStatus('listening')
    } catch (err) {
      console.error('Mic error:', err)
      setStatus('error')
    }
  }, [onAudioReady, setStatus])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
  }, [])

  return { isRecording, startRecording, stopRecording }
}

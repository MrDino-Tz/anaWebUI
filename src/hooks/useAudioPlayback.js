import { useRef, useCallback } from 'react'

export function useAudioPlayback() {
  const audioRef = useRef(null)

  const playBase64Audio = useCallback((base64, mimeType = 'audio/mpeg') => {
    const binaryStr = atob(base64)
    const len = binaryStr.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryStr.charCodeAt(i)
    }
    const blob = new Blob([bytes], { type: mimeType })
    const url = URL.createObjectURL(blob)

    if (audioRef.current) {
      audioRef.current.pause()
      URL.revokeObjectURL(audioRef.current.src)
    }

    const audio = new Audio(url)
    audioRef.current = audio
    audio.play().catch(err => console.warn('Audio playback failed:', err))
  }, [])

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [])

  return { playBase64Audio, stopAudio }
}

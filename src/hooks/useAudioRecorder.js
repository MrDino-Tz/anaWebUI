import { useState, useRef, useCallback } from 'react'

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++)
    view.setUint8(offset + i, string.charCodeAt(i))
}

function encodeWAV(samples, sampleRate) {
  const buffer = new ArrayBuffer(samples.length * 2)
  const view = new DataView(buffer)
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]))
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
  }

  const dataSize = buffer.byteLength
  const headerSize = 44
  const totalSize = headerSize + dataSize
  const wav = new DataView(new ArrayBuffer(totalSize))

  writeString(wav, 0, 'RIFF')
  wav.setUint32(4, totalSize - 8, true)
  writeString(wav, 8, 'WAVE')
  writeString(wav, 12, 'fmt ')
  wav.setUint32(16, 16, true)
  wav.setUint16(20, 1, true)
  wav.setUint16(22, 1, true)
  wav.setUint32(24, sampleRate, true)
  wav.setUint32(28, sampleRate * 2, true)
  wav.setUint16(32, 2, true)
  wav.setUint16(34, 16, true)
  writeString(wav, 36, 'data')
  wav.setUint32(40, dataSize, true)

  new Uint8Array(wav.buffer).set(new Uint8Array(buffer), headerSize)
  return wav.buffer
}

export function useAudioRecorder(onAudioReady, setStatus) {
  const [isRecording, setIsRecording] = useState(false)
  const audioContextRef = useRef(null)
  const streamRef = useRef(null)
  const samplesRef = useRef([])
  const sourceRef = useRef(null)
  const processorRef = useRef(null)

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const audioContext = new AudioContext()
      audioContextRef.current = audioContext
      const source = audioContext.createMediaStreamSource(stream)
      sourceRef.current = source

      samplesRef.current = []

      const processor = audioContext.createScriptProcessor(4096, 1, 1)
      processorRef.current = processor

      processor.onaudioprocess = (event) => {
        samplesRef.current.push(new Float32Array(event.inputBuffer.getChannelData(0)))
      }

      source.connect(processor)
      processor.connect(audioContext.destination)

      setIsRecording(true)
      setStatus('listening')
    } catch (err) {
      console.error('Mic error:', err)
      setStatus('error')
    }
  }, [onAudioReady, setStatus])

  const stopRecording = useCallback(() => {
    const ctx = audioContextRef.current
    const sampleRate = ctx?.sampleRate || 16000

    if (processorRef.current) {
      processorRef.current.disconnect()
      processorRef.current = null
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect()
      sourceRef.current = null
    }
    if (ctx) {
      ctx.close()
      audioContextRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }

    setIsRecording(false)

    const allSamples = new Float32Array(
      samplesRef.current.reduce((acc, s) => acc + s.length, 0)
    )
    let offset = 0
    for (const s of samplesRef.current) {
      allSamples.set(s, offset)
      offset += s.length
    }

    const wavBuffer = encodeWAV(allSamples, sampleRate)
    const blob = new Blob([wavBuffer], { type: 'audio/wav' })
    onAudioReady(blob)
    setStatus('idle')
  }, [onAudioReady, setStatus])

  return { isRecording, startRecording, stopRecording }
}

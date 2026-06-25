import { useRef } from 'react'
import useFaceAnimation from '../hooks/useFaceAnimation'

export default function FaceCanvas({ status, isRecording, className, width = 256, height = 128, style, canvasRef: externalRef }) {
  const internalRef = useRef(null)
  const canvasRef = externalRef || internalRef
  useFaceAnimation(canvasRef, status, isRecording)

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className || 'face-canvas-sm'}
      style={style}
    />
  )
}

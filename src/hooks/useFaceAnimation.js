import { useRef, useEffect } from 'react'

export default function useFaceAnimation(canvasRef, status, isRecording) {
  const animRef = useRef(null)
  const stateRef = useRef({
    eyeX: 0.5, eyeY: 0.5,      // normalized 0-1
    lookTimer: 0,
    blinkState: 0, blinkTimer: 0,
  })
  const statusRef = useRef(status)
  statusRef.current = status
  const recordingRef = useRef(isRecording)
  recordingRef.current = isRecording

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function drawEye(cx, cy, rx, ryMax, eyeH) {
      const ry = eyeH / 2
      ctx.fillStyle = '#0d0d1a'
      ctx.strokeStyle = '#00c8ff'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.ellipse(cx, cy, rx, Math.max(0.5, ry), 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      if (eyeH > 3) {
        const s = stateRef.current
        // pupil offset based on look direction
        const px = cx + (s.eyeX - 0.5) * rx * 0.5
        const py = cy + (s.eyeY - 0.5) * ry * 0.5
        const pr = Math.max(1.5, rx * 0.28 * (eyeH / ryMax))

        ctx.fillStyle = '#00c8ff'
        ctx.beginPath()
        ctx.arc(px, py, pr, 0, Math.PI * 2)
        ctx.fill()

        // specular highlight
        ctx.fillStyle = 'rgba(255,255,255,0.45)'
        ctx.beginPath()
        ctx.arc(px - pr * 0.35, py - pr * 0.35, pr * 0.35, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawFace() {
      if (!canvas) return
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)
      const s = stateRef.current
      const now = Date.now()

      // --- Blink state machine ---
      let eyeH = H * 0.36   // max eye height
      const ryMax = eyeH

      if (s.blinkState === 1) {
        eyeH = ryMax * (1 - (now - s.blinkTimer) / 80)
        if (now - s.blinkTimer > 80) { s.blinkState = 2; s.blinkTimer = now }
      }
      if (s.blinkState === 2) {
        eyeH = 0
        if (now - s.blinkTimer > 60) { s.blinkState = 3; s.blinkTimer = now }
      }
      if (s.blinkState === 3) {
        eyeH = ryMax * ((now - s.blinkTimer) / 80)
        if (now - s.blinkTimer > 80) s.blinkState = 0
      }
      eyeH = Math.max(0, Math.min(ryMax, eyeH))

      // Eye positions: left 1/3, right 2/3 of canvas width
      const eyeRx = W * 0.1     // eye horizontal radius
      const eyeCy = H * 0.42    // eye vertical center
      const eyeL = W * 0.32
      const eyeR = W * 0.68

      drawEye(eyeL, eyeCy, eyeRx, ryMax, eyeH)
      drawEye(eyeR, eyeCy, eyeRx, ryMax, eyeH)

      // Smile
      ctx.strokeStyle = '#a855f7'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(W * 0.5, H * 0.72, W * 0.12, 0.15 * Math.PI, 0.85 * Math.PI)
      ctx.stroke()

      // Listening/recording pulse aura
      if (statusRef.current === 'listening' || recordingRef.current) {
        const pulse = Math.sin(now / 280) * 0.5 + 0.5
        ctx.fillStyle = `rgba(0, 200, 255, ${0.04 + pulse * 0.05})`
        ctx.beginPath()
        ctx.ellipse(W * 0.5, H * 0.5, W * 0.48 + pulse * 4, H * 0.48 + pulse * 2, 0, 0, Math.PI * 2)
        ctx.fill()
      }

      // Speaking bounce
      if (statusRef.current === 'speaking') {
        const bounce = Math.abs(Math.sin(now / 220))
        ctx.strokeStyle = `rgba(34,197,94,${0.25 + bounce * 0.2})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.ellipse(W * 0.5, H * 0.5, W * 0.47, H * 0.46, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    function loop() {
      const s = stateRef.current
      const now = Date.now()

      // Randomized eye look
      if (now - s.lookTimer > 2000 + Math.random() * 3000) {
        s.lookTimer = now
        s.eyeX = 0.2 + Math.random() * 0.6
        s.eyeY = 0.25 + Math.random() * 0.5
      }

      // Blink trigger
      if (s.blinkState === 0 && Math.random() < 0.003) {
        s.blinkState = 1
        s.blinkTimer = now
      }

      drawFace()
      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [canvasRef, status, isRecording])
}

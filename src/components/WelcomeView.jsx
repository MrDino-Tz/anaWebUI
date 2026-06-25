import { useRef } from 'react'

export default function WelcomeView({ status, onPromptClick, disabled }) {
  const orbRef = useRef(null)

  return (
    <div className="welcome">
      <div className="welcome-orb" ref={orbRef} />
      
      <h1>Hi ANA</h1>
      <p className="welcome-sub">Ask anything about your IoT systems?</p>

      {/* Note: The prompt cards are moved inside InputBar in this design, or they are just above it? 
          The design shows "Describe a new image" inside the input box, and feature pills below it. 
          There are no large prompt cards in this specific screen, just feature pills at the very bottom.
      */}
      
    </div>
  )
}

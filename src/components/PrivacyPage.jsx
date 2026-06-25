import { Link } from 'react-router-dom'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#131314] text-[#E3E3E3] flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#2B2D31]">
        <Link to="/" className="flex items-center gap-3">
          <img src="/ana-logo.png" alt="Ana Logo" className="w-10 h-10 rounded-full object-cover" />
          <span className="text-xl font-normal tracking-wide" style={{ fontFamily: 'Alphacorsa, sans-serif' }}>Ana Solar</span>
        </Link>
        <Link to="/chat" className="text-sm text-[#A3A6AA] hover:text-white border border-[#2B2D31] px-4 py-2 rounded-lg transition-colors">
          Go to Chat
        </Link>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-medium text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#606368] mb-8">Last updated: June 2026</p>

        <section className="space-y-6 text-[15px] leading-relaxed text-[#A3A6AA]">
          <h2 className="text-xl font-medium text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>
            When you use Ana, we may collect the following information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Account Information:</strong> Username, email address, and hashed password when you register.</li>
            <li><strong className="text-white">Conversation Data:</strong> Chat messages and uploaded images are processed to generate responses and stored for conversation continuity.</li>
            <li><strong className="text-white">Device Information:</strong> A unique device ID is generated and stored locally to namespace your memories and preferences.</li>
            <li><strong className="text-white">Profile Data:</strong> Display name, avatar image, and any additional information you choose to provide.</li>
          </ul>

          <h2 className="text-xl font-medium text-white mt-8 mb-4">2. How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide, maintain, and improve Ana's services.</li>
            <li>To personalize your experience through long-term memory.</li>
            <li>To process voice and image inputs for AI analysis.</li>
            <li>To communicate with you about service updates (only if you opt in).</li>
          </ul>

          <h2 className="text-xl font-medium text-white mt-8 mb-4">3. Data Storage and Security</h2>
          <p>
            Your data is stored on our secure servers. Passwords are hashed using bcrypt.
            We use JWT tokens for authentication — your session is valid for 72 hours.
            Memories are scoped to your device ID and are not shared between users.
          </p>

          <h2 className="text-xl font-medium text-white mt-8 mb-4">4. Third-Party Services</h2>
          <p>
            Ana uses the following third-party services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Groq:</strong> AI inference for chat and vision processing.</li>
            <li><strong className="text-white">ElevenLabs:</strong> Text-to-speech voice synthesis.</li>
            <li><strong className="text-white">Cloudinary:</strong> Avatar image hosting and delivery.</li>
          </ul>
          <p>
            Each of these services processes data according to their own privacy policies.
            We do not sell your personal data to any third party.
          </p>

          <h2 className="text-xl font-medium text-white mt-8 mb-4">5. Your Rights</h2>
          <p>
            You may request deletion of your account and associated data at any time
            by contacting us. You can clear your conversation history and memory
            through the app at any time.
          </p>

          <h2 className="text-xl font-medium text-white mt-8 mb-4">6. Contact</h2>
          <p>
            For privacy-related inquiries, contact us at{' '}
            <a href="mailto:privacy@anagpa.com" className="text-[#A3A6AA] hover:text-white underline">
              privacy@anagpa.com
            </a>.
          </p>
        </section>
      </main>

      <footer className="border-t border-[#2B2D31] py-6 text-center text-sm text-[#606368]">
        &copy; {new Date().getFullYear()} DTC Team — Ana GPA
      </footer>
    </div>
  )
}

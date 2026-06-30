import Footer from './Footer'
import Header from './Header'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-0 text-text-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-medium text-text-100 mb-2">Privacy Policy</h1>
        <p className="text-sm text-text-400 mb-8">Last updated: June 2026</p>

        <section className="space-y-6 text-sm sm:text-[15px] leading-relaxed text-text-200">
          <h2 className="text-xl font-medium text-text-100 mt-8 mb-4">1. Information We Collect</h2>
          <p>
            When you use Ana, we may collect the following information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-text-100">Account Information:</strong> Username, email address, and hashed password when you register.</li>
            <li><strong className="text-text-100">Conversation Data:</strong> Chat messages and uploaded images are processed to generate responses and stored for conversation continuity.</li>
            <li><strong className="text-text-100">Device Information:</strong> A unique device ID is generated and stored locally to namespace your memories and preferences.</li>
            <li><strong className="text-text-100">Profile Data:</strong> Display name, avatar image, and any additional information you choose to provide.</li>
          </ul>

          <h2 className="text-xl font-medium text-text-100 mt-8 mb-4">2. How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide, maintain, and improve Ana's services.</li>
            <li>To personalize your experience through long-term memory.</li>
            <li>To process voice and image inputs for AI analysis.</li>
            <li>To communicate with you about service updates (only if you opt in).</li>
          </ul>

          <h2 className="text-xl font-medium text-text-100 mt-8 mb-4">3. Data Storage and Security</h2>
          <p>
            Your data is stored on our secure servers. Passwords are hashed using bcrypt.
            We use JWT tokens for authentication — your session is valid for 72 hours.
            Memories are scoped to your device ID and are not shared between users.
          </p>

          <h2 className="text-xl font-medium text-text-100 mt-8 mb-4">4. Third-Party Services</h2>
          <p>
            Ana uses the following third-party services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-text-100">Groq:</strong> AI inference for chat and vision processing.</li>
            <li><strong className="text-text-100">ElevenLabs:</strong> Text-to-speech voice synthesis.</li>
            <li><strong className="text-text-100">Cloudinary:</strong> Avatar image hosting and delivery.</li>
          </ul>
          <p>
            Each of these services processes data according to their own privacy policies.
            We do not sell your personal data to any third party.
          </p>

          <h2 className="text-xl font-medium text-text-100 mt-8 mb-4">5. Your Rights</h2>
          <p>
            You may request deletion of your account and associated data at any time
            by contacting us. You can clear your conversation history and memory
            through the app at any time.
          </p>

          <h2 className="text-xl font-medium text-text-100 mt-8 mb-4">6. Contact</h2>
          <p>
            For privacy-related inquiries, contact us at{' '}
            <a href="mailto:privacy@anagpa.com" className="text-text-200 hover:text-text-100 underline">
              privacy@anagpa.com
            </a>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}

import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-0 text-text-100 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-bg-200">
        <Link to="/" className="flex items-center gap-3">
          <img src="/ana-logo.png" alt="Ana Logo" className="w-10 h-10 rounded-full object-cover" />
          <span className="text-xl font-normal tracking-wide" style={{ fontFamily: 'Alphacorsa, sans-serif' }}>Ana Solar</span>
        </Link>
        <Link to="/chat" className="text-sm text-text-200 hover:text-white border border-bg-200 px-4 py-2 rounded-lg transition-colors">
          Go to Chat
        </Link>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-medium text-white mb-8">About Ana</h1>

        <section className="space-y-6 text-[15px] leading-relaxed text-text-200">
          <p>
            <strong className="text-white">Ana</strong> is an intelligent personal assistant
            designed and developed by <strong className="text-white">DTC Team</strong>.
            Built with a focus on privacy, performance, and bilingual communication,
            Ana helps you manage tasks, generate documents, control devices, and
            access information through natural conversation.
          </p>

          <h2 className="text-xl font-medium text-white mt-8 mb-4">Our Mission</h2>
          <p>
            To create an AI assistant that is accessible, private, and genuinely useful
            for everyday life — whether you speak English, Swahili, or both. Ana is
            designed to run efficiently on modest hardware while delivering
            powerful AI capabilities through cloud integration.
          </p>

          <h2 className="text-xl font-medium text-white mt-8 mb-4">Technology</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">AI Engine:</strong> Powered by Groq cloud inference and local Ollama models for fast, private responses.</li>
            <li><strong className="text-white">Voice:</strong> Noise-filtered speech recognition with high-quality ElevenLabs text-to-speech.</li>
            <li><strong className="text-white">Vision:</strong> Image analysis using state-of-the-art vision-language models.</li>
            <li><strong className="text-white">Memory:</strong> Persistent per-device memory for personalized interactions.</li>
            <li><strong className="text-white">Knowledge Base:</strong> Upload documents for Ana to learn from and reference.</li>
            <li><strong className="text-white">Cross-Platform:</strong> Available on web, Android, and dedicated IoT hardware.</li>
          </ul>

          <h2 className="text-xl font-medium text-white mt-8 mb-4">The Team</h2>
          <p>
            DTC Team is a group of engineers and designers passionate about making
            AI accessible to everyone. We believe in open, transparent technology
            that respects user privacy and works offline when possible.
          </p>
        </section>
      </main>

      <footer className="border-t border-bg-200 py-6 text-center text-sm text-text-400">
        &copy; {new Date().getFullYear()} DTC Team — Ana GPA
      </footer>
    </div>
  )
}

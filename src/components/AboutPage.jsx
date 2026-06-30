import Footer from './Footer'
import Header from './Header'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-0 text-text-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-medium text-text-100 mb-8">About Ana</h1>

        <section className="space-y-6 text-sm sm:text-[15px] leading-relaxed text-text-200">
          <p>
            <strong className="text-text-100">Ana</strong> is an intelligent personal assistant
            designed and developed by <strong className="text-text-100">DTC Team</strong>.
            Built with a focus on privacy, performance, and bilingual communication,
            Ana helps you manage tasks, generate documents, control devices, and
            access information through natural conversation.
          </p>

          <h2 className="text-xl font-medium text-text-100 mt-8 mb-4">Our Mission</h2>
          <p>
            To create an AI assistant that is accessible, private, and genuinely useful
            for everyday life — whether you speak English, Swahili, or both. Ana is
            designed to run efficiently on modest hardware while delivering
            powerful AI capabilities through cloud integration.
          </p>

          <h2 className="text-xl font-medium text-text-100 mt-8 mb-4">Technology</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-text-100">AI Engine:</strong> Powered by Groq cloud inference and local Ollama models for fast, private responses.</li>
            <li><strong className="text-text-100">Voice:</strong> Noise-filtered speech recognition with high-quality ElevenLabs text-to-speech.</li>
            <li><strong className="text-text-100">Vision:</strong> Image analysis using state-of-the-art vision-language models.</li>
            <li><strong className="text-text-100">Memory:</strong> Persistent per-device memory for personalized interactions.</li>
            <li><strong className="text-text-100">Knowledge Base:</strong> Upload documents for Ana to learn from and reference.</li>
            <li><strong className="text-text-100">Cross-Platform:</strong> Available on web, Android, and dedicated IoT hardware.</li>
          </ul>

          <h2 className="text-xl font-medium text-text-100 mt-8 mb-4">The Team</h2>
          <p>
            DTC Team is a group of engineers and designers passionate about making
            AI accessible to everyone. We believe in open, transparent technology
            that respects user privacy and works offline when possible.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}

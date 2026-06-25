import { Link } from 'react-router-dom'

export default function ContactPage() {
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
        <h1 className="text-4xl font-medium text-white mb-8">Contact Us</h1>

        <section className="space-y-6 text-[15px] leading-relaxed text-[#A3A6AA]">
          <p>
            We'd love to hear from you. Whether you have a question, feedback,
            or a partnership opportunity, reach out to us through any of the
            channels below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="bg-[#1E1F22] border border-[#2B2D31] rounded-lg p-6">
              <h3 className="text-white font-medium mb-2">Email</h3>
              <a href="mailto:support@anagpa.com" className="text-[#A3A6AA] hover:text-white transition-colors">
                support@anagpa.com
              </a>
            </div>

            <div className="bg-[#1E1F22] border border-[#2B2D31] rounded-lg p-6">
              <h3 className="text-white font-medium mb-2">GitHub</h3>
              <a href="https://github.com/DTC-Team" target="_blank" rel="noopener noreferrer" className="text-[#A3A6AA] hover:text-white transition-colors">
                github.com/DTC-Team
              </a>
            </div>

            <div className="bg-[#1E1F22] border border-[#2B2D31] rounded-lg p-6">
              <h3 className="text-white font-medium mb-2">YouTube</h3>
              <a href="https://youtube.com/@DTC-Team" target="_blank" rel="noopener noreferrer" className="text-[#A3A6AA] hover:text-white transition-colors">
                youtube.com/@DTC-Team
              </a>
            </div>

            <div className="bg-[#1E1F22] border border-[#2B2D31] rounded-lg p-6">
              <h3 className="text-white font-medium mb-2">Report an Issue</h3>
              <a href="https://github.com/DTC-Team/ana-gpa/issues" target="_blank" rel="noopener noreferrer" className="text-[#A3A6AA] hover:text-white transition-colors">
                GitHub Issues
              </a>
            </div>
          </div>

          <p className="mt-8 text-sm text-[#606368]">
            We aim to respond within 48 hours during business days.
          </p>
        </section>
      </main>

      <footer className="border-t border-[#2B2D31] py-6 text-center text-sm text-[#606368]">
        &copy; {new Date().getFullYear()} DTC Team — Ana GPA
      </footer>
    </div>
  )
}

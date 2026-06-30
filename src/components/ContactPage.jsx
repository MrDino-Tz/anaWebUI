import Footer from './Footer'
import Header from './Header'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg-0 text-text-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-medium text-text-100 mb-8">Contact Us</h1>

        <section className="space-y-6 text-sm sm:text-[15px] leading-relaxed text-text-200">
          <p>
            We'd love to hear from you. Whether you have a question, feedback,
            or a partnership opportunity, reach out to us through any of the
            channels below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="bg-bg-100 border border-bg-200 rounded-lg p-6">
              <h3 className="text-text-100 font-medium mb-2">Email</h3>
              <a href="mailto:support@anagpa.com" className="text-text-200 hover:text-text-100 transition-colors">
                support@anagpa.com
              </a>
            </div>

            <div className="bg-bg-100 border border-bg-200 rounded-lg p-6">
              <h3 className="text-text-100 font-medium mb-2">GitHub</h3>
              <a href="https://github.com/DTC-Team" target="_blank" rel="noopener noreferrer" className="text-text-200 hover:text-text-100 transition-colors">
                github.com/DTC-Team
              </a>
            </div>

            <div className="bg-bg-100 border border-bg-200 rounded-lg p-6">
              <h3 className="text-text-100 font-medium mb-2">YouTube</h3>
              <a href="https://youtube.com/@DTC-Team" target="_blank" rel="noopener noreferrer" className="text-text-200 hover:text-text-100 transition-colors">
                youtube.com/@DTC-Team
              </a>
            </div>

            <div className="bg-bg-100 border border-bg-200 rounded-lg p-6">
              <h3 className="text-text-100 font-medium mb-2">Report an Issue</h3>
              <a href="https://github.com/DTC-Team/ana-gpa/issues" target="_blank" rel="noopener noreferrer" className="text-text-200 hover:text-text-100 transition-colors">
                GitHub Issues
              </a>
            </div>
          </div>

          <p className="mt-8 text-sm text-text-400">
            We aim to respond within 48 hours during business days.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}

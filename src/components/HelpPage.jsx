import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const topics = [
  {
    q: 'How do I sign in?',
    a: 'Click "Sign In" at the top of the page, enter your email and password. If you don\'t have an account, click "Sign Up" to create one first.',
  },
  {
    q: 'I forgot my password. What should I do?',
    a: 'On the sign-in page, click "Forgot password" and follow the reset link sent to your email. If you don\'t receive it, check your spam folder.',
  },
  {
    q: 'Why is Ana not responding?',
    a: 'Check your internet connection. If you\'re connected, try refreshing the page. If the issue persists, the backend server might be down — check /api/ana/health or contact support.',
  },
  {
    q: 'Voice recording is not working',
    a: 'Make sure you\'ve granted microphone permission in your browser. On Chrome, click the lock icon in the address bar and enable microphone access. On Android, check app permissions in Settings.',
  },
  {
    q: 'Can I clear my chat history?',
    a: 'Yes. Open the sidebar and use the delete option on individual conversations. You can also clear all history from the Settings menu.',
  },
  {
    q: 'How do I change the AI model?',
    a: 'Open Settings from the chat page and select a different model from the dropdown. Available models depend on the backend configuration.',
  },
  {
    q: 'The app is slow or laggy',
    a: 'Try switching to a lighter AI model in Settings. Close unused browser tabs and check your network speed. If on mobile, try switching to WiFi.',
  },
  {
    q: 'How do I report a bug?',
    a: 'Use the "Report a Bug" option in the sidebar or contact us via the Contact page. Please include a description of the issue, steps to reproduce, and your browser/device info.',
  },
]

function TopicItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-bg-200 bg-bg-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-text-100 hover:bg-bg-200/50 transition-colors"
      >
        {question}
        <svg
          className={`w-4 h-4 text-text-300 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-text-300 leading-relaxed">{answer}</div>
      )}
    </div>
  )
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-bg-0 text-text-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-12 w-full">
        <p className="text-xs uppercase tracking-[0.24em] text-text-400 mb-3">Support</p>
        <h1 className="text-3xl sm:text-4xl font-medium text-text-100 mb-4">Help</h1>
        <p className="text-base leading-relaxed text-text-300 mb-10">
          Find practical support resources, troubleshooting tips, and answers to common questions.
        </p>

        <div className="space-y-2">
          {topics.map((t) => (
            <TopicItem key={t.q} question={t.q} answer={t.a} />
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-bg-200 flex flex-wrap gap-3">
          <Link to="/contact" className="text-sm text-text-200 hover:text-text-100 border border-bg-200 px-4 py-2 rounded-lg transition-colors">
            Contact support
          </Link>
          <Link to="/docs" className="text-sm bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-[#E3E3E3] transition-colors">
            View documentation
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

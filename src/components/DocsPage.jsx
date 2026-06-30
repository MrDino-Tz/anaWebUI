import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const faqs = [
  {
    q: 'Is Ana free to use?',
    a: 'Yes, the web chat and voice features are free. Advanced features like image analysis and extended memory may have usage limits during beta.',
  },
  {
    q: 'Can Ana understand Swahili?',
    a: 'Yes. Ana detects Swahili phrases in your messages and responds in Swahili. Voice input also supports Swahili speech recognition.',
  },
  {
    q: 'Where is my data stored?',
    a: 'Conversations are stored on our secure servers and used only to improve your experience. You can clear your chat history at any time from settings.',
  },
  {
    q: 'Does Ana work on mobile?',
    a: 'Yes. The Android app supports text chat, voice mode, image uploads, and push notifications. The web version works on all mobile browsers too.',
  },
  {
    q: 'Can I use Ana offline?',
    a: 'Some features require an internet connection. Cached conversations are available offline, but real-time responses need connectivity.',
  },
]

const sections = [
  {
    id: 'getting-started',
    title: 'Getting started',
    content: (
      <div className="space-y-4">
        <p>
          Ana is your AI-powered personal assistant designed for chat, voice, image analysis, and device control. 
          Follow these steps to get started in minutes.
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed text-text-300">
          <li><strong className="text-text-100">Create an account</strong> — Sign up at <Link to="/signup" className="text-blue-500 hover:underline">/signup</Link> with your email and a secure password.</li>
          <li><strong className="text-text-100">Start a conversation</strong> — Open the chat, type anything, and Ana will respond naturally. Use the text box at the bottom of the screen.</li>
          <li><strong className="text-text-100">Try voice mode</strong> — Click the microphone icon to speak instead of typing. Supported in both English and Swahili.</li>
          <li><strong className="text-text-100">Upload an image</strong> — Use the attachment button to send a photo. Ana can describe, analyze, or answer questions about it.</li>
          <li><strong className="text-text-100">Customise your experience</strong> — Open Settings to change the theme, select a different AI model, or update your profile.</li>
        </ol>
        <div className="bg-bg-100 border border-bg-200 rounded-xl p-4 mt-4">
          <p className="text-sm font-medium text-text-100 mb-1">Tip</p>
          <p className="text-sm text-text-300">Try asking Ana "What can you help me with?" to see a full list of capabilities.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'build-with-ana',
    title: 'Build with Ana',
    content: (
      <div className="space-y-4">
        <p>
          Ana exposes a REST API that you can integrate into your own applications, workflows, or IoT devices.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Chat API</h4>
            <p className="text-xs text-text-300">Send messages and receive streaming responses. Supports context memory and multi-turn conversations.</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Voice API</h4>
            <p className="text-xs text-text-300">Upload audio for speech-to-text, get a text response, and receive audio back for text-to-speech playback.</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Vision API</h4>
            <p className="text-xs text-text-300">Send images with optional prompts for analysis, description, or question-answering about visual content.</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Device Actions</h4>
            <p className="text-xs text-text-300">Ana can discover and control apps on your Android device — open apps, send intents, and automate tasks.</p>
          </div>
        </div>
        <p className="text-sm text-text-300">
          The backend runs as a FastAPI server. All endpoints are documented and accessible at the configured backend URL.
        </p>
      </div>
    ),
  },
  {
    id: 'quickstart',
    title: 'Quickstart',
    content: (
      <div className="space-y-4">
        <p>Get productive with Ana in under 5 minutes with these starter tasks.</p>
        <div className="space-y-3">
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-text-100 text-bg-0 flex items-center justify-center text-xs font-bold">1</span>
              <div>
                <h4 className="text-sm font-medium text-text-100">Set up your account</h4>
                <p className="text-xs text-text-300 mt-1">Go to <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>, enter your email and password, and verify your account. You can optionally set a display name and profile photo.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-text-100 text-bg-0 flex items-center justify-center text-xs font-bold">2</span>
              <div>
                <h4 className="text-sm font-medium text-text-100">Send your first message</h4>
                <p className="text-xs text-text-300 mt-1">Open the chat and type "Hello, Ana!" or ask a question like "What is the weather today?" Ana will respond conversationally.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-text-100 text-bg-0 flex items-center justify-center text-xs font-bold">3</span>
              <div>
                <h4 className="text-sm font-medium text-text-100">Try a voice interaction</h4>
                <p className="text-xs text-text-300 mt-1">Tap the microphone button and speak a question. Ana will transcribe your speech, respond, and read the answer back to you.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-text-100 text-bg-0 flex items-center justify-center text-xs font-bold">4</span>
              <div>
                <h4 className="text-sm font-medium text-text-100">Generate a document</h4>
                <p className="text-xs text-text-300 mt-1">Ask Ana to "Write a short email about..." or "Summarise this text". Ana can draft, summarise, and format content on demand.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'reference',
    title: 'Reference',
    content: (
      <div className="space-y-4">
        <p>Key capabilities, commands, and configuration options.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-bg-200">
                <th className="text-left py-3 px-4 font-medium text-text-100">Feature</th>
                <th className="text-left py-3 px-4 font-medium text-text-100">Description</th>
                <th className="text-left py-3 px-4 font-medium text-text-100">Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-200">
              <tr>
                <td className="py-3 px-4 text-text-100">Text chat</td>
                <td className="py-3 px-4 text-text-300">Context-aware conversations with memory</td>
                <td className="py-3 px-4"><span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">Web + Android</span></td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-text-100">Voice mode</td>
                <td className="py-3 px-4 text-text-300">Speech-to-text + text-to-speech in English/Swahili</td>
                <td className="py-3 px-4"><span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">Web + Android</span></td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-text-100">Image analysis</td>
                <td className="py-3 px-4 text-text-300">Upload images for description and Q&A</td>
                <td className="py-3 px-4"><span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">Web + Android</span></td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-text-100">Device control</td>
                <td className="py-3 px-4 text-text-300">Open apps and trigger actions on Android</td>
                <td className="py-3 px-4"><span className="text-xs bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">Android only</span></td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-text-100">Web search</td>
                <td className="py-3 px-4 text-text-300">Real-time internet search for current information</td>
                <td className="py-3 px-4"><span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">Web + Android</span></td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-text-100">Theme support</td>
                <td className="py-3 px-4 text-text-300">Light, dark, and system-follow themes</td>
                <td className="py-3 px-4"><span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">Web + Android</span></td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-text-100">Conversation history</td>
                <td className="py-3 px-4 text-text-300">Save, search, and resume past conversations</td>
                <td className="py-3 px-4"><span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">Web + Android</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: 'faq',
    title: 'FAQ',
    content: (
      <div className="space-y-2">
        {faqs.map((item) => (
          <FaqItem key={item.q} question={item.q} answer={item.a} />
        ))}
      </div>
    ),
  },
]

function FaqItem({ question, answer }) {
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

function SidebarLink({ id, title, active, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
        active === id
          ? 'bg-bg-200 text-text-100 font-medium'
          : 'text-text-300 hover:text-text-100 hover:bg-bg-100'
      }`}
    >
      {title}
    </button>
  )
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started')

  const scrollToSection = (id) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-bg-0 text-text-100 flex flex-col">
      <Header />

      <div className="flex-1 flex max-w-6xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0 border-r border-bg-200 py-8 px-3 sticky top-0 self-start max-h-screen overflow-y-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-text-400 mb-4 px-4">Resources</p>
          <nav className="space-y-1">
            {sections.map((s) => (
              <SidebarLink key={s.id} id={s.id} title={s.title} active={activeSection} onClick={scrollToSection} />
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-6 py-8 md:px-12 md:py-12 min-w-0">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-text-400 mb-3">Resources</p>
            <h1 className="text-3xl sm:text-4xl font-medium text-text-100 mb-4">Documentation</h1>
            <p className="text-base leading-relaxed text-text-300 mb-12">
              Start here to learn the basics of Ana, understand its features, and get productive quickly.
            </p>
          </div>

          <div className="space-y-16">
            {sections.map((s) => (
              <section key={s.id} id={s.id}>
                <h2 className="text-2xl font-medium text-text-100 mb-5">{s.title}</h2>
                {s.content}
              </section>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-bg-200 flex flex-wrap gap-3">
            <Link to="/contact" className="text-sm text-text-200 hover:text-text-100 border border-bg-200 px-4 py-2 rounded-lg transition-colors">
              Contact support
            </Link>
            <Link to="/signup" className="text-sm bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-[#E3E3E3] transition-colors">
              Start with Ana
            </Link>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

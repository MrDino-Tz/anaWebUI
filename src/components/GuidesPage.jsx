import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const sections = [
  {
    id: 'first-week',
    title: 'First week tips',
    content: (
      <div className="space-y-4">
        <p>A simple checklist to get comfortable with Ana quickly.</p>
        <div className="space-y-3">
          {[
            { day: 'Day 1', items: ['Create your account and set a display name', 'Send a few casual messages to see how Ana responds', 'Try asking "What can you help me with?"'] },
            { day: 'Day 2', items: ['Explore voice mode — tap the mic and speak a question', 'Upload an image and ask Ana to describe it', 'Check the theme toggle and switch between light/dark mode'] },
            { day: 'Day 3', items: ['Write a longer prompt (e.g. "Draft an email about...")', 'Ask Ana to summarise a block of text', 'Use a follow-up question to test memory'] },
            { day: 'Day 4', items: ['Open the sidebar and review your conversation history', 'Rename or delete a past conversation', 'Search through past chats using the search box'] },
            { day: 'Day 5', items: ['Try device actions on Android — ask Ana to open an app', 'Explore Settings to change persona or model', 'Use Ana for a real task you do daily'] },
          ].map(({ day, items }) => (
            <div key={day} className="rounded-xl border border-bg-200 bg-bg-100 p-4">
              <h4 className="text-sm font-medium text-text-100 mb-2">{day}</h4>
              <ul className="list-disc pl-4 space-y-1 text-sm text-text-300">
                {items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'daily-workflows',
    title: 'Daily workflows',
    content: (
      <div className="space-y-4">
        <p>Use Ana for task tracking, note creation, voice interaction, and content drafting.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Task tracking</h4>
            <p className="text-sm text-text-300">Ask Ana to "Create a to-do list for today" or "Remind me to follow up on the email". Ana keeps track of context within the conversation.</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Note creation</h4>
            <p className="text-sm text-text-300">Dictate or type notes during meetings. Say "Take a note: the deadline is Friday" and review them later in chat history.</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Voice interaction</h4>
            <p className="text-sm text-text-300">Use the microphone for hands-free queries while cooking, driving, or multitasking. Works in both English and Swahili.</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Content drafting</h4>
            <p className="text-sm text-text-300">Ask Ana to write emails, social posts, reports, or creative pieces. Provide a few keywords and let Ana generate the first draft.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'advanced-prompts',
    title: 'Advanced prompts',
    content: (
      <div className="space-y-4">
        <p>Learn how to get richer, more reliable results from your requests.</p>
        <div className="space-y-3">
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Be specific</h4>
            <p className="text-xs text-text-300 mb-2">Instead of "Write an email", try "Write a professional email to a client apologising for the delay and offering a 10% discount on their next order."</p>
            <div className="bg-bg-200 rounded-lg px-3 py-2 text-xs text-text-400 font-mono">Write a professional email to a client apologising for the delay and offering a 10% discount on their next order.</div>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Provide context</h4>
            <p className="text-xs text-text-300 mb-2">Give Ana background information before asking. "I'm preparing a presentation on renewable energy for a high school audience. Can you suggest 5 key points?"</p>
            <div className="bg-bg-200 rounded-lg px-3 py-2 text-xs text-text-400 font-mono">I'm preparing a presentation on renewable energy for a high school audience. Can you suggest 5 key points?</div>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Specify format</h4>
            <p className="text-xs text-text-300 mb-2">Ask for a specific output format. "List the pros and cons of remote work as a table" or "Explain machine learning in 3 bullet points."</p>
            <div className="bg-bg-200 rounded-lg px-3 py-2 text-xs text-text-400 font-mono">List the pros and cons of remote work as a table with 3 columns: Category, Pro, Con.</div>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Follow up</h4>
            <p className="text-xs text-text-300 mb-2">Build on previous answers. After Ana responds, say "Can you expand on point 3?" or "Make it more concise" to refine the output.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'voice-memory',
    title: 'Voice and memory',
    content: (
      <div className="space-y-4">
        <p>Use voice features and memory to personalise the experience.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Voice input</h4>
            <p className="text-sm text-text-300">Click the microphone and start speaking. Ana transcribes in real-time using Web Speech API, detects the language (English or Swahili), and responds.</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Voice output</h4>
            <p className="text-sm text-text-300">Ana reads responses aloud using ElevenLabs text-to-speech. Markdown is stripped before speaking for natural delivery.</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Conversation memory</h4>
            <p className="text-sm text-text-300">Ana remembers context within a conversation. Reference earlier messages naturally — "As I mentioned earlier..." or "Going back to the budget topic..."</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Language switching</h4>
            <p className="text-sm text-text-300">Ana detects when you switch between English and Swahili within the same conversation and adapts responses automatically.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'team-productivity',
    title: 'Team productivity',
    content: (
      <div className="space-y-4">
        <p>Streamline collaboration with reusable prompts, summaries, and structured outputs.</p>
        <div className="space-y-3">
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Meeting summaries</h4>
            <p className="text-sm text-text-300">Paste meeting transcripts or notes and ask Ana to "Summarise this meeting with key decisions and action items."</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Brainstorming</h4>
            <p className="text-sm text-text-300">Use Ana as a sounding board. "Give me 10 ideas for improving customer onboarding" — then refine together.</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Shared templates</h4>
            <p className="text-sm text-text-300">Create reusable prompt templates. "Every Monday, ask me for my priorities and format them as a checklist." Ana remembers your preferences.</p>
          </div>
        </div>
      </div>
    ),
  },
]

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

export default function GuidesPage() {
  const [activeSection, setActiveSection] = useState('first-week')

  const scrollToSection = (id) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-bg-0 text-text-100 flex flex-col">
      <Header />

      <div className="flex-1 flex max-w-6xl mx-auto w-full">
        <aside className="hidden md:block w-56 flex-shrink-0 border-r border-bg-200 py-8 px-3 sticky top-0 self-start max-h-screen overflow-y-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-text-400 mb-4 px-4">Resources</p>
          <nav className="space-y-1">
            {sections.map((s) => (
              <SidebarLink key={s.id} id={s.id} title={s.title} active={activeSection} onClick={scrollToSection} />
            ))}
          </nav>
        </aside>

        <main className="flex-1 px-6 py-8 md:px-12 md:py-12 min-w-0">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-text-400 mb-3">Resources</p>
            <h1 className="text-3xl sm:text-4xl font-medium text-text-100 mb-4">Guides</h1>
            <p className="text-base leading-relaxed text-text-300 mb-12">
              Step-by-step walkthroughs for everyday use and advanced workflows.
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

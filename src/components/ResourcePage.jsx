import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function ResourcePage({
  eyebrow = 'Resources',
  title,
  description,
  highlights = [],
  cards = [],
  ctaLabel = 'Go to Chat',
  ctaTo = '/chat',
}) {
  return (
    <div className="min-h-screen bg-bg-0 text-text-100 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-bg-200">
        <Link to="/" className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}ana-logo.png`} alt="Ana Logo" className="w-10 h-10 rounded-full object-cover" />
          <span className="text-xl font-normal tracking-wide" style={{ fontFamily: 'Alphacorsa, sans-serif' }}>Ana AGI</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to={ctaTo} className="text-sm text-text-200 hover:text-text-100 border border-bg-200 px-4 py-2 rounded-lg transition-colors">
            {ctaLabel}
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 w-full">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.24em] text-text-400 mb-3">{eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-medium text-text-100 mb-5">{title}</h1>
          <p className="text-lg leading-relaxed text-text-300">{description}</p>
        </div>

        {highlights.length > 0 && (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-bg-200 bg-bg-100 p-5">
                <h2 className="text-base font-medium text-text-100 mb-2">{item.title}</h2>
                <p className="text-sm leading-relaxed text-text-300">{item.body}</p>
              </div>
            ))}
          </div>
        )}

        {cards.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {cards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-bg-200 bg-bg-100 p-6">
                <h3 className="text-lg font-medium text-text-100 mb-2">{card.title}</h3>
                <p className="text-sm leading-relaxed text-text-300">{card.body}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/contact" className="text-sm text-text-200 hover:text-text-100 border border-bg-200 px-4 py-2 rounded-lg transition-colors">
            Contact support
          </Link>
          <Link to="/signup" className="text-sm bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-[#E3E3E3] transition-colors">
            Start with Ana
          </Link>
        </div>
      </main>

      <footer className="border-t border-bg-200 py-6 text-center text-sm text-text-400">
        &copy; {new Date().getFullYear()} DTC Team — Ana AGI
      </footer>
    </div>
  )
}

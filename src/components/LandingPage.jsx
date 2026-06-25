import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'

const features = [
  { title: 'Smart Conversations', description: 'Natural language chat with context-aware responses.' },
  { title: 'Document Generation', description: 'Create professional reports and presentations from prompts.' },
  { title: 'Knowledge Base', description: 'Upload documents. Ana learns from your data.' },
  { title: 'Long-Term Memory', description: 'Remembers your preferences across sessions.' },
  { title: 'Multi-Language', description: 'Speaks English and Swahili fluently.' },
  { title: 'Cross-Platform', description: 'Access from browser, Android, or IoT hardware.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-0 text-text-100 flex flex-col">
      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-bg-200">
        <Link to="/" className="flex items-center gap-3">
          <img src="/ana-logo.png" alt="Ana Logo" className="w-12 h-12 rounded-full object-cover" />
          <span className="text-2xl font-normal tracking-wide" style={{ fontFamily: 'Alphacorsa, sans-serif' }}>Ana Solar</span>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[500px] gap-2 p-2 md:grid-cols-2">
                  {features.map((f) => (
                    <li key={f.title}>
                      <NavigationMenuLink asChild>
                        <Link to="/chat" className="block p-3 rounded-md hover:bg-bg-200 transition-colors no-underline">
                          <div className="text-sm font-medium text-text-100">{f.title}</div>
                          <p className="text-xs text-text-300 mt-0.5">{f.description}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[220px] gap-2 p-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/about" className="block p-3 rounded-md hover:bg-bg-200 transition-colors no-underline">
                        <div className="text-sm font-medium text-text-100">About Ana</div>
                        <p className="text-xs text-text-300 mt-0.5">Learn about the project</p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/privacy" className="block p-3 rounded-md hover:bg-bg-200 transition-colors no-underline">
                        <div className="text-sm font-medium text-text-100">Privacy Policy</div>
                        <p className="text-xs text-text-300 mt-0.5">How we handle your data</p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/terms" className="block p-3 rounded-md hover:bg-bg-200 transition-colors no-underline">
                        <div className="text-sm font-medium text-text-100">Terms of Use</div>
                        <p className="text-xs text-text-300 mt-0.5">Terms and conditions</p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/signin">Sign In</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/signup"
            className="text-sm bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-[#E3E3E3] transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <img src="/ana-logo.png" alt="Ana Logo" className="w-20 h-20 rounded-full object-cover border border-bg-300 mb-6" />
        <h1 className="text-5xl sm:text-6xl font-medium text-text-100 tracking-tight mb-4">
          Your Personal AI Assistant
        </h1>
        <p className="text-lg text-text-300 max-w-xl mx-auto mb-10 leading-relaxed">
          Ana GPA is your intelligent companion for conversation, document generation,
          knowledge management, and more. Powered by advanced AI, always ready to help.
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/signup"
            className="bg-white text-black px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#E3E3E3] transition-colors"
          >
            Get Started Free
          </Link>
          <Link
            to="/chat"
            className="border border-bg-200 text-text-200 px-6 py-3 rounded-lg text-sm font-medium hover:bg-bg-100 hover:text-text-100 transition-colors"
          >
            Try Anonymous Chat
          </Link>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 py-16 border-t border-bg-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-medium text-center text-text-100 mb-12">
            Everything you need
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              number="01"
              title="Smart Conversations"
              description="Natural language chat with context-aware responses. Voice input and text-to-speech for a hands-free experience."
            />
            <FeatureCard
              number="02"
              title="Document Generation"
              description="Create professional reports, letters, invoices, and presentations from simple text prompts."
            />
            <FeatureCard
              number="03"
              title="Knowledge Base"
              description="Upload documents and files. Ana learns from your data to provide informed, personalized assistance."
            />
            <FeatureCard
              number="04"
              title="Long-Term Memory"
              description="Remembers your preferences, past conversations, and important information across sessions."
            />
            <FeatureCard
              number="05"
              title="Multi-Language"
              description="Speaks English and Swahili fluently. Automatic language detection for seamless communication."
            />
            <FeatureCard
              number="06"
              title="Cross-Platform"
              description="Access Ana from your web browser, Android device, or dedicated IoT hardware with OLED face."
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-16 border-t border-bg-200 text-center">
        <h2 className="text-2xl font-medium text-text-100 mb-4">
          Ready to meet Ana?
        </h2>
        <p className="text-text-300 mb-8 max-w-md mx-auto">
          Sign up for free and start your conversation. No credit card required.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-white text-black px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#E3E3E3] transition-colors"
        >
          Create Free Account
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="py-16 border-t border-bg-200">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-14 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {/* Product */}
            <div className="space-y-3 text-sm">
              <span className="block font-medium text-text-100">Product</span>
              {['Ana GPA Robot', 'Ana Desktop', 'Ana Mobile'].map((item) => (
                <a key={item} href="/chat" className="text-text-300 hover:text-text-100 block duration-150">{item}</a>
              ))}
            </div>

            {/* Resources */}
            <div className="space-y-3 text-sm">
              <span className="block font-medium text-text-100">Resources</span>
              {['Docs', 'Guides', 'Integration', 'Help', 'Pricing', 'Resources'].map((item) => (
                <a key={item} href="#" className="text-text-300 hover:text-text-100 block duration-150">{item}</a>
              ))}
            </div>

            {/* Company */}
            <div className="space-y-3 text-sm">
              <span className="block font-medium text-text-100">Company</span>
              <Link to="/about" className="text-text-300 hover:text-text-100 block duration-150 text-sm">About</Link>
              <Link to="/contact" className="text-text-300 hover:text-text-100 block duration-150 text-sm">Contact Us</Link>
              <Link to="/privacy" className="text-text-300 hover:text-text-100 block duration-150 text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-text-300 hover:text-text-100 block duration-150 text-sm">Terms of Service</Link>
            </div>

            {/* Social */}
            <div className="space-y-3 text-sm">
              <span className="block font-medium text-text-100">Social</span>
              {[
                { name: 'GitHub', icon: <GithubSvg /> },
                { name: 'YouTube', icon: <YoutubeSvg /> },
              ].map(({ name, icon }) => (
                <a key={name} href="#" className="text-text-300 hover:text-text-100 block duration-150">
                  <span className="flex gap-2 items-center">
                    {icon}
                    {name}
                  </span>
                </a>
              ))}
            </div>

            {/* Brand */}
            <div className="flex justify-end">
              <img src="/ana-logo.png" alt="Ana Logo" className="w-8 h-8 rounded-full object-cover border border-bg-300" />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6 py-6 border-t border-bg-200">
            <TechQuote />
            <span className="text-text-400 text-sm">
              &copy; {new Date().getFullYear()} DTC Team — Ana GPA
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ number, title, description }) {
  return (
    <div className="bg-bg-100 border border-bg-200 rounded-lg p-6 hover:border-[#4B4D53] transition-colors">
      <span className="text-xs text-text-400 font-mono mb-3 block">{number}</span>
      <h3 className="text-base font-medium text-text-100 mb-2">{title}</h3>
      <p className="text-sm text-text-300 leading-relaxed">{description}</p>
    </div>
  )
}

const quotes = [
  "The best way to predict the future is to invent it.",
  "Code is like humor. When you have to explain it, it's bad.",
  "First, solve the problem. Then, write the code.",
  "Talk is cheap. Show me the code.",
  "Any fool can write code that a computer can understand.",
  "Simplicity is the soul of efficiency.",
  "It works on my machine.",
  "There are only two hard things in computer science.",
]

function TechQuote() {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % quotes.length)
        setFade(true)
      }, 300)
    }, 6000)
    return () => clearInterval(interval)
  }, [])
  return (
    <span className={`text-text-300 text-sm transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
      &ldquo;{quotes[index]}&rdquo;
    </span>
  )
}

function GithubSvg() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function YoutubeSvg() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

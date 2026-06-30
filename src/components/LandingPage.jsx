import { Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
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
      <Header landing>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[90vw] max-w-[500px] gap-2 p-2 md:grid-cols-2">
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
                <ul className="grid w-[90vw] max-w-[220px] gap-2 p-2">
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
      </Header>

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-14 sm:py-20 text-center">
        <img src={`${import.meta.env.BASE_URL}ana-logo.png`} alt="Ana Logo" className="w-20 h-20 rounded-full object-cover border border-bg-300 mb-6" />
        <h1 className="text-5xl sm:text-6xl font-medium text-text-100 tracking-tight mb-4">
          Your Personal AI Assistant
        </h1>
        <p className="text-lg text-text-300 max-w-xl mx-auto mb-10 leading-relaxed">
          Ana GPA is your intelligent companion for conversation, document generation,
          knowledge management, and more. Powered by advanced AI, always ready to help.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
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
      <section className="px-4 sm:px-6 py-12 sm:py-16 border-t border-bg-200">
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
      <section className="px-4 sm:px-6 py-12 sm:py-16 border-t border-bg-200 text-center">
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

      <Footer />
    </div>
  )
}

function FeatureCard({ number, title, description }) {
  return (
    <div className="bg-bg-100 border border-bg-200 rounded-lg p-6 hover:border-bg-400 transition-colors">
      <span className="text-xs text-text-400 font-mono mb-3 block">{number}</span>
      <h3 className="text-base font-medium text-text-100 mb-2">{title}</h3>
      <p className="text-sm text-text-300 leading-relaxed">{description}</p>
    </div>
  )
}



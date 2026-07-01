import { Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import CardSwap, { Card } from './CardSwap'
import MagicBento from './MagicBento'
import TrueFocus from './TrueFocus'

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
      <Header landing />

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-14 sm:py-20 text-center">
        <img src={`${import.meta.env.BASE_URL}ana-logo.png`} alt="Ana Logo" className="w-20 h-20 rounded-full object-cover border border-bg-300 mb-6" />
        <div className="mb-6">
          <TrueFocus
            sentence="Your Personal AI Assistant"
            blurAmount={3}
            borderColor="#D97757"
            glowColor="rgba(217,119,87,0.4)"
            animationDuration={0.6}
            pauseBetweenAnimations={1.5}
          />
        </div>
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
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-bg-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-medium text-center text-text-100 mb-12 sm:mb-16">
            Everything you need
          </h2>
          {/* Mobile: MagicBento */}
          <div className="lg:hidden">
            <MagicBento
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="217, 119, 87"
            />
          </div>

          {/* Desktop: FeatureList + CardSwap */}
          <div className="hidden lg:flex lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="space-y-5 max-w-xl">
                {features.map((f, i) => (
                  <FeatureRow key={f.title} number={String(i + 1).padStart(2, '0')} title={f.title} description={f.description} />
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 w-[640px] h-[620px] relative">
              <CardSwap
                width={520}
                height={400}
                cardDistance={42}
                verticalDistance={36}
                delay={4000}
                pauseOnHover={true}
              >
                {features.map((f) => (
                  <Card key={f.title}>
                    <div className="flex flex-col h-full">
                      <img src={getImage(f.title)} alt={f.title} className="w-full h-40 sm:h-48 object-cover" />
                      <div className="flex flex-col items-center justify-center flex-1 px-4 py-4 sm:px-6 sm:py-5 text-center">
                        <h3 className="text-sm sm:text-base font-semibold text-text-100 mb-1.5">{f.title}</h3>
                        <p className="text-xs sm:text-sm text-text-300 leading-relaxed">{f.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
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

function FeatureRow({ number, title, description }) {
  return (
    <div className="flex items-start gap-4 group">
      <span className="text-xs text-text-400 font-mono mt-0.5 min-w-[24px]">{number}</span>
      <div>
        <h3 className="text-base font-medium text-text-100 mb-1">{title}</h3>
        <p className="text-sm text-text-300 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function getImage(title) {
  const base = 'https://images.unsplash.com/photo-'
  const params = '?w=500&h=300&fit=crop&auto=format'
  const seeds = {
    'Smart Conversations': `${base}1764173038859-11b5bcf26d0f${params}`,
    'Document Generation': `${base}1750277120336-ca98ec2e2f90${params}`,
    'Knowledge Base': `${base}1762791111002-6e5f5544df0f${params}`,
    'Long-Term Memory': `${base}1504639725590-34d0984388bd${params}`,
    'Multi-Language': `${base}1451187580459-43490279c0fa${params}`,
    'Cross-Platform': `${base}1752850903501-4307079e0c4a${params}`,
  }
  return seeds[title] ?? `${base}1517694712202-14dd9538aa97${params}`
}



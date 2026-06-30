import { Link } from 'react-router-dom'

const sections = [
  {
    title: 'Product',
    links: [
      { label: 'Ana AGI Robot', to: '/chat' },
      { label: 'Ana Desktop', to: '/chat' },
      { label: 'Ana Mobile', to: '/chat' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', to: '/docs' },
      { label: 'Guides', to: '/guides' },
      { label: 'Integration', to: '/integration' },
      { label: 'Help', to: '/help' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'GitHub', to: 'https://github.com/MrDino-Tz/anaWebUI', external: true },
      { label: 'YouTube', to: '#', external: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-bg-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-sm font-medium text-text-100 mb-3">{s.title}</h4>
              <ul className="space-y-2">
                {s.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-300 hover:text-text-100 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-sm text-text-300 hover:text-text-100 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-bg-200 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}ana-logo.png`}
              alt="Ana Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span
              className="text-xl font-normal tracking-wide text-text-100"
              style={{ fontFamily: 'Alphacorsa, sans-serif' }}
            >
              Ana AGI
            </span>
          </Link>
          <p className="text-sm text-text-300 italic text-center max-w-md">
            &ldquo;Code is like humor. When you have to explain it, it&rsquo;s bad.&rdquo;
          </p>
          <p className="text-sm text-text-400">
            &copy; {new Date().getFullYear()} DTC Team — Ana AGI
          </p>
        </div>
      </div>
    </footer>
  )
}

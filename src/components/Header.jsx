import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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

export default function Header({ children, landing = false }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const hideNav = ['/signin', '/signup', '/chat'].includes(location.pathname)

  return (
    <div>
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-bg-200">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img
              src={`${import.meta.env.BASE_URL}ana-logo.png`}
              alt="Ana Logo"
              className={`${landing ? 'w-12 h-12' : 'w-10 h-10'} rounded-full object-cover`}
            />
            <span
              className={`${landing ? 'text-2xl' : 'text-xl'} font-normal tracking-wide`}
              style={{ fontFamily: 'Alphacorsa, sans-serif' }}
            >
              Ana AGI
            </span>
          </Link>
        </div>
        {!hideNav && (
          <>
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
          </>
        )}
        {children}
        <div className={`flex items-center ${landing && !hideNav ? 'gap-3 sm:gap-4' : 'gap-2 sm:gap-3'}`}>
          {!hideNav && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 text-text-300 hover:text-text-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
          <ThemeToggle />
          {!hideNav && (
            landing ? (
              <Link
                to="/signup"
                className="hidden sm:inline-flex text-sm bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-[#E3E3E3] transition-colors"
              >
                Get Started
              </Link>
            ) : (
              <Link
                to="/chat"
                className="hidden sm:inline-flex text-sm text-text-200 hover:text-text-100 border border-bg-200 px-4 py-2 rounded-lg transition-colors"
              >
                Go to Chat
              </Link>
            )
          )}
        </div>
      </header>
      {!hideNav && mobileOpen && (
        <div className="md:hidden border-b border-bg-200 bg-bg-0 px-4 py-4 space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-text-400 mb-3">Features</p>
          {features.map((f) => (
            <Link
              key={f.title}
              to="/chat"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-bg-200 transition-colors no-underline"
            >
              <div className="text-sm font-medium text-text-100">{f.title}</div>
              <p className="text-xs text-text-300">{f.description}</p>
            </Link>
          ))}
          <hr className="border-bg-200 my-3" />
          <p className="text-xs uppercase tracking-[0.2em] text-text-400 mb-3">About</p>
          <Link
            to="/about"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md hover:bg-bg-200 transition-colors"
          >
            <div className="text-sm font-medium text-text-100">About Ana</div>
          </Link>
          <Link
            to="/privacy"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md hover:bg-bg-200 transition-colors"
          >
            <div className="text-sm font-medium text-text-100">Privacy Policy</div>
          </Link>
          <Link
            to="/terms"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md hover:bg-bg-200 transition-colors"
          >
            <div className="text-sm font-medium text-text-100">Terms of Use</div>
          </Link>
          <hr className="border-bg-200 my-3" />
          <Link
            to={landing ? '/signup' : '/chat'}
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#E3E3E3] transition-colors"
          >
            {landing ? 'Get Started' : 'Go to Chat'}
          </Link>
          <Link
            to="/signin"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center border border-bg-200 text-text-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-bg-100 transition-colors"
          >
            Sign In
          </Link>
        </div>
      )}
      {!landing && (
        <div className="px-4 sm:px-6 py-2 border-b border-bg-200">
          <Link
            to="/"
            className="text-sm text-text-300 hover:text-text-100 flex items-center gap-1 transition-colors w-fit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Back
          </Link>
        </div>
      )}
    </div>
  )
}

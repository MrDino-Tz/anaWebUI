import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Header({ children, landing = false }) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-bg-200">
      <div className="flex items-center gap-2 sm:gap-4">
        {!landing && (
          <Link
            to="/"
            className="text-sm text-text-300 hover:text-text-100 flex items-center gap-1 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Back
          </Link>
        )}
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
      {children}
      <div className={`flex items-center ${landing ? 'gap-3 sm:gap-4' : 'gap-2 sm:gap-3'}`}>
        <ThemeToggle />
        {landing ? (
          <Link
            to="/signup"
            className="text-sm bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-[#E3E3E3] transition-colors"
          >
            Get Started
          </Link>
        ) : (
          <Link
            to="/chat"
            className="text-sm text-text-200 hover:text-text-100 border border-bg-200 px-4 py-2 rounded-lg transition-colors"
          >
            Go to Chat
          </Link>
        )}
      </div>
    </header>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ThemeToggle from './ThemeToggle'

export default function SignInPage() {
  const navigate = useNavigate()
  const { login, loading, error } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(username, password)
      navigate('/chat', { replace: true })
    } catch {}
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-bg-0 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="w-16 h-16 rounded-full bg-bg-200 border border-bg-300 flex items-center justify-center mx-auto mb-4 hover:bg-bg-300 transition-colors">
              <span className="text-2xl font-serif font-bold text-text-100">A</span>
            </div>
          </Link>
          <h1 className="text-2xl font-medium text-text-100">Welcome Back to Ana GPA</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username or Email"
              className="w-full bg-bg-100 border border-bg-200 rounded-lg px-4 py-3 text-text-100 text-sm placeholder:text-text-300 focus:outline-none focus:border-bg-400 transition-colors"
              required
              autoFocus
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-bg-100 border border-bg-200 rounded-lg px-4 py-3 text-text-100 text-sm placeholder:text-text-300 focus:outline-none focus:border-bg-400 transition-colors"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2.5">
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black rounded-lg px-4 py-3 text-sm font-medium hover:bg-[#E3E3E3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/signup" className="text-sm text-text-300 hover:text-text-100 transition-colors">
            Don't have an account? <span className="text-text-100 font-medium">Sign up</span>
          </Link>
        </div>

        <div className="text-center mt-4">
          <Link to="/chat" className="text-xs text-text-400 hover:text-text-300 transition-colors">
            Continue without account
          </Link>
        </div>
      </div>
    </div>
  )
}

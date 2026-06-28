import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ThemeToggle from './ThemeToggle'

export default function SignUpPage() {
  const navigate = useNavigate()
  const { register, loading, error } = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) return
    try {
      await register(username, password, email)
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
            <div className="w-16 h-16 rounded-full bg-bg-200 border border-bg-300 overflow-hidden mx-auto mb-4 hover:bg-bg-300 transition-colors">
              <img
                src={`${import.meta.env.BASE_URL}ana-logo.png`}
                alt="Ana Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <h1 className="text-2xl font-medium text-text-100">Ana GPA, Let's Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-bg-100 border border-bg-200 rounded-lg px-4 py-3 text-text-100 text-sm placeholder:text-text-300 focus:outline-none focus:border-bg-400 transition-colors"
              required
              autoFocus
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              className="w-full bg-bg-100 border border-bg-200 rounded-lg px-4 py-3 text-text-100 text-sm placeholder:text-text-300 focus:outline-none focus:border-bg-400 transition-colors"
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
          <div>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              className="w-full bg-bg-100 border border-bg-200 rounded-lg px-4 py-3 text-text-100 text-sm placeholder:text-text-300 focus:outline-none focus:border-bg-400 transition-colors"
              required
            />
            {confirm && password !== confirm && (
              <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2.5">
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (confirm && password !== confirm)}
            className="w-full bg-white text-black rounded-lg px-4 py-3 text-sm font-medium hover:bg-[#E3E3E3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/signin" className="text-sm text-text-300 hover:text-text-100 transition-colors">
            Already have an account? <span className="text-text-100 font-medium">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

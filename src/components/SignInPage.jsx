import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

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
    <div className="h-screen w-full flex items-center justify-center bg-[#131314]">
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="w-16 h-16 rounded-full bg-[#2B2D31] border border-[#35373C] flex items-center justify-center mx-auto mb-4 hover:bg-[#35373C] transition-colors">
              <span className="text-2xl font-serif font-bold text-[#E3E3E3]">A</span>
            </div>
          </Link>
          <h1 className="text-2xl font-medium text-white">Welcome Back to Ana GPA</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username or Email"
              className="w-full bg-[#1E1F22] border border-[#2B2D31] rounded-lg px-4 py-3 text-[#E3E3E3] text-sm placeholder:text-[#80848E] focus:outline-none focus:border-[#4B4D53] transition-colors"
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
              className="w-full bg-[#1E1F22] border border-[#2B2D31] rounded-lg px-4 py-3 text-[#E3E3E3] text-sm placeholder:text-[#80848E] focus:outline-none focus:border-[#4B4D53] transition-colors"
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
          <Link to="/signup" className="text-sm text-[#80848E] hover:text-[#E3E3E3] transition-colors">
            Don't have an account? <span className="text-white font-medium">Sign up</span>
          </Link>
        </div>

        <div className="text-center mt-4">
          <Link to="/chat" className="text-xs text-[#606368] hover:text-[#80848E] transition-colors">
            Continue without account
          </Link>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const sections = [
  {
    id: 'api-overview',
    title: 'API overview',
    content: (
      <div className="space-y-4">
        <p>Ana exposes a REST API at the configured backend URL. All endpoints accept and return JSON.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-bg-200">
                <th className="text-left py-3 px-4 font-medium text-text-100">Endpoint</th>
                <th className="text-left py-3 px-4 font-medium text-text-100">Method</th>
                <th className="text-left py-3 px-4 font-medium text-text-100">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-200">
              <tr><td className="py-3 px-4 font-mono text-xs text-text-100">/api/ana/chat</td><td className="py-3 px-4 text-text-300">POST</td><td className="py-3 px-4 text-text-300">Send a text message and receive a streaming response</td></tr>
              <tr><td className="py-3 px-4 font-mono text-xs text-text-100">/api/ana/voice</td><td className="py-3 px-4 text-text-300">POST</td><td className="py-3 px-4 text-text-300">Upload audio for STT + LLM + TTS pipeline</td></tr>
              <tr><td className="py-3 px-4 font-mono text-xs text-text-100">/api/ana/vision</td><td className="py-3 px-4 text-text-300">POST</td><td className="py-3 px-4 text-text-300">Send an image with an optional text prompt for analysis</td></tr>
              <tr><td className="py-3 px-4 font-mono text-xs text-text-100">/api/ana/profile</td><td className="py-3 px-4 text-text-300">POST</td><td className="py-3 px-4 text-text-300">Update user profile data (name, email, avatar)</td></tr>
              <tr><td className="py-3 px-4 font-mono text-xs text-text-100">/api/ana/models</td><td className="py-3 px-4 text-text-300">GET</td><td className="py-3 px-4 text-text-300">List available LLM models and their status</td></tr>
              <tr><td className="py-3 px-4 font-mono text-xs text-text-100">/api/ana/health</td><td className="py-3 px-4 text-text-300">GET</td><td className="py-3 px-4 text-text-300">Health check endpoint</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: 'chat-api',
    title: 'Chat API',
    content: (
      <div className="space-y-4">
        <p>Send messages and receive streaming responses with context memory.</p>
        <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
          <h4 className="text-sm font-medium text-text-100 mb-2">Request</h4>
          <pre className="text-xs text-text-300 overflow-x-auto bg-bg-200 rounded-lg p-3 font-mono">{`POST /api/ana/chat
{
  "message": "What is the weather today?",
  "device_id": "abc123",
  "apps": [],
  "persona": "default",
  "model": ""
}`}</pre>
        </div>
        <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
          <h4 className="text-sm font-medium text-text-100 mb-2">Response (streaming)</h4>
          <pre className="text-xs text-text-300 overflow-x-auto bg-bg-200 rounded-lg p-3 font-mono">{`{
  "status": "success",
  "response": "I don't have access to live weather data, but I can help you search for it!",
  "persona": "default"
}`}</pre>
        </div>
      </div>
    ),
  },
  {
    id: 'voice-api',
    title: 'Voice API',
    content: (
      <div className="space-y-4">
        <p>Upload audio for speech-to-text, get a text response, and receive audio back for playback.</p>
        <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
          <h4 className="text-sm font-medium text-text-100 mb-2">Request</h4>
          <pre className="text-xs text-text-300 overflow-x-auto bg-bg-200 rounded-lg p-3 font-mono">{`POST /api/ana/voice
Content-Type: multipart/form-data

file: (WAV audio file)
language: "sw-TZ" | "en-US"`}</pre>
        </div>
        <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
          <h4 className="text-sm font-medium text-text-100 mb-2">Response</h4>
          <pre className="text-xs text-text-300 overflow-x-auto bg-bg-200 rounded-lg p-3 font-mono">{`{
  "status": "success",
  "transcript": "Hello, how are you?",
  "response": "I'm doing great! How can I help you today?",
  "audio_base64": "//uQxAAAAAANIAAAAAE...",
  "persona": "default"
}`}</pre>
        </div>
        <p className="text-sm text-text-300">The <code className="text-xs bg-bg-200 px-1.5 py-0.5 rounded">audio_base64</code> field contains the TTS response as base64-encoded MP3 data. Decode and play it on the client side.</p>
      </div>
    ),
  },
  {
    id: 'vision-api',
    title: 'Vision API',
    content: (
      <div className="space-y-4">
        <p>Send images with optional prompts for analysis, description, or question-answering.</p>
        <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
          <h4 className="text-sm font-medium text-text-100 mb-2">Request</h4>
          <pre className="text-xs text-text-300 overflow-x-auto bg-bg-200 rounded-lg p-3 font-mono">{`POST /api/ana/vision
Content-Type: multipart/form-data

file: (JPEG/PNG image)
prompt: "What is shown in this image?"
device_id: "abc123"`}</pre>
        </div>
        <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
          <h4 className="text-sm font-medium text-text-100 mb-2">Response</h4>
          <pre className="text-xs text-text-300 overflow-x-auto bg-bg-200 rounded-lg p-3 font-mono">{`{
  "status": "success",
  "response": "This image shows a sunset over a mountain range with a lake in the foreground.",
  "persona": "default"
}`}</pre>
        </div>
      </div>
    ),
  },
  {
    id: 'connect-your-stack',
    title: 'Connect your stack',
    content: (
      <div className="space-y-4">
        <p>Link Ana with your app or environment using the built-in web experience.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Web embedding</h4>
            <p className="text-sm text-text-300">Embed the chat interface in your own web app via iframe or by pointing users to your Ana instance URL.</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Custom frontend</h4>
            <p className="text-sm text-text-300">Build your own UI on top of the Ana API. Use the chat, voice, and vision endpoints directly from your frontend code.</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Android integration</h4>
            <p className="text-sm text-text-300">The Android app uses the same API. You can customise the backend URL in Settings for your own server deployment.</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">IoT devices</h4>
            <p className="text-sm text-text-300">Ana includes a face animation canvas (FaceCanvas) designed for IoT display screens with minimal resource usage.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'developer-support',
    title: 'Developer support',
    content: (
      <div className="space-y-4">
        <p>Get help with configuration, setup, and customisation for your environment.</p>
        <div className="space-y-3">
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Backend setup</h4>
            <p className="text-sm text-text-300">The backend is a FastAPI Python server. Clone the repository, install dependencies from <code className="text-xs bg-bg-200 px-1.5 py-0.5 rounded">requirements.txt</code>, and run with <code className="text-xs bg-bg-200 px-1.5 py-0.5 rounded">uvicorn backend:app</code>.</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Environment variables</h4>
            <p className="text-sm text-text-300">Configure <code className="text-xs bg-bg-200 px-1.5 py-0.5 rounded">GROQ_API_KEY</code>, <code className="text-xs bg-bg-200 px-1.5 py-0.5 rounded">ELEVENLABS_API_KEY</code>, and <code className="text-xs bg-bg-200 px-1.5 py-0.5 rounded">VISION_MODEL</code> in your <code className="text-xs bg-bg-200 px-1.5 py-0.5 rounded">.env</code> file. Defaults work for most use cases.</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Deployment</h4>
            <p className="text-sm text-text-300">The included <code className="text-xs bg-bg-200 px-1.5 py-0.5 rounded">deploy.sh</code> script handles server setup. The web frontend builds to static files deployable on any static host or CDN.</p>
          </div>
          <div className="rounded-xl border border-bg-200 bg-bg-100 p-4">
            <h4 className="text-sm font-medium text-text-100 mb-1">Troubleshooting</h4>
            <p className="text-sm text-text-300">Check <code className="text-xs bg-bg-200 px-1.5 py-0.5 rounded">/api/ana/health</code> to confirm the server is running. Review server logs for model fallback or API key issues.</p>
          </div>
        </div>
      </div>
    ),
  },
]

function SidebarLink({ id, title, active, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
        active === id
          ? 'bg-bg-200 text-text-100 font-medium'
          : 'text-text-300 hover:text-text-100 hover:bg-bg-100'
      }`}
    >
      {title}
    </button>
  )
}

export default function IntegrationPage() {
  const [activeSection, setActiveSection] = useState('api-overview')

  const scrollToSection = (id) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-bg-0 text-text-100 flex flex-col">
      <Header />

      <div className="flex-1 flex max-w-6xl mx-auto w-full">
        <aside className="hidden md:block w-56 flex-shrink-0 border-r border-bg-200 py-8 px-3 sticky top-0 self-start max-h-screen overflow-y-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-text-400 mb-4 px-4">Resources</p>
          <nav className="space-y-1">
            {sections.map((s) => (
              <SidebarLink key={s.id} id={s.id} title={s.title} active={activeSection} onClick={scrollToSection} />
            ))}
          </nav>
        </aside>

        <main className="flex-1 px-6 py-8 md:px-12 md:py-12 min-w-0">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-text-400 mb-3">Resources</p>
            <h1 className="text-3xl sm:text-4xl font-medium text-text-100 mb-4">Integration</h1>
            <p className="text-base leading-relaxed text-text-300 mb-12">
              Connect Ana to your tools, systems, and custom workflows.
            </p>
          </div>

          <div className="space-y-16">
            {sections.map((s) => (
              <section key={s.id} id={s.id}>
                <h2 className="text-2xl font-medium text-text-100 mb-5">{s.title}</h2>
                {s.content}
              </section>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-bg-200 flex flex-wrap gap-3">
            <Link to="/contact" className="text-sm text-text-200 hover:text-text-100 border border-bg-200 px-4 py-2 rounded-lg transition-colors">
              Contact support
            </Link>
            <Link to="/signup" className="text-sm bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-[#E3E3E3] transition-colors">
              Start with Ana
            </Link>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

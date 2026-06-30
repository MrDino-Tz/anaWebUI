import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './ThemeProvider'
import App from './App'
import LandingPage from './components/LandingPage'
import SignInPage from './components/SignInPage'
import SignUpPage from './components/SignUpPage'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'
import PrivacyPage from './components/PrivacyPage'
import TermsPage from './components/TermsPage'
import DocsPage from './components/DocsPage'
import GuidesPage from './components/GuidesPage'
import IntegrationPage from './components/IntegrationPage'
import PricingPage from './components/PricingPage'
import HelpPage from './components/HelpPage'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/chat" element={<App />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/integration" element={<IntegrationPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>,
)

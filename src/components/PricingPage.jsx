import { Link } from 'react-router-dom'
import { CircleCheck } from 'lucide-react'
import { cn } from '../lib/utils'
import Footer from './Footer'
import Header from './Header'

const pricingData = [
  {
    title: 'Basic',
    price: 'Free',
    description: 'Perfect for exploring Ana and personal use.',
    features: ['Web chat access', 'Basic voice mode', 'Standard AI model', 'Email support'],
    cta: 'Get Started',
    href: '/signup',
  },
  {
    title: 'Standard',
    price: '$9/month',
    description: 'Best for regular users who want more power.',
    features: ['Everything in Basic', 'Advanced AI model', 'Image analysis', 'Priority support', 'Extended memory'],
    cta: 'Choose Standard',
    href: '/signup',
    featured: true,
  },
  {
    title: 'Pro',
    price: '$29/month',
    description: 'For power users and teams who need it all.',
    features: ['Everything in Standard', 'All AI models', 'Unlimited image analysis', 'API access', 'Custom persona', 'Priority 24/7 support'],
    cta: 'Choose Pro',
    href: '/signup',
  },
]

function Badge({ children, variant = 'secondary' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variant === 'default' && 'bg-text-100 text-bg-0',
        variant === 'secondary' && 'bg-bg-200 text-text-300'
      )}
    >
      {children}
    </span>
  )
}

function Button({ children, variant = 'secondary', className, ...props }) {
  return (
    <Link
      className={cn(
        'inline-flex items-center justify-center rounded-lg text-sm font-medium px-4 py-2 transition-colors',
        variant === 'default' && 'bg-text-100 text-bg-0 hover:opacity-90',
        variant === 'secondary' && 'border border-bg-200 text-text-200 hover:text-text-100 hover:bg-bg-100',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

function PricingCard({ plan }) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl border p-6 text-left bg-bg-100',
        plan.featured && 'border-text-100/30 shadow-sm ring-1 ring-text-100/10'
      )}
    >
      <div className="text-center">
        <div className="inline-flex items-center gap-2">
          <Badge variant={plan.featured ? 'default' : 'secondary'}>{plan.title}</Badge>
          {plan.featured && (
            <span className="rounded-full bg-text-100/10 px-2 py-0.5 text-xs font-medium text-text-100">
              Most popular
            </span>
          )}
        </div>
        <h4 className="mb-2 mt-4 text-2xl font-medium text-text-100">{plan.price}</h4>
        {plan.description && <p className="text-sm text-text-300">{plan.description}</p>}
      </div>

      <div className="my-4 border-t border-bg-200" />

      <ul className="space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center text-sm text-text-300">
            <CircleCheck className="mr-2 h-4 w-4 text-text-100 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Button
          to={plan.href}
          variant={plan.featured ? 'default' : 'secondary'}
          className="w-full"
        >
          {plan.cta}
        </Button>
      </div>
    </div>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bg-0 text-text-100 flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center gap-4 text-center px-4 sm:px-6 py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.24em] text-text-400 mb-3">Resources</p>
        <h1 className="text-3xl sm:text-4xl font-medium text-text-100">Pricing</h1>
        <p className="text-lg text-text-300 md:text-xl">Select the plan that best suits your needs.</p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full">
          {pricingData.map((plan) => (
            <PricingCard key={plan.title} plan={plan} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

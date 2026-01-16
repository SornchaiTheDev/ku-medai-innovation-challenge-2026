import { Mail, Phone } from 'lucide-react'
import { challengeConstants } from '@/data/challenge-constants'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Organized By</h3>
            <ul className="space-y-2 text-slate-400">
              {challengeConstants.organizers.map((organizer, index) => (
                <li key={index}>{organizer}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3 text-slate-400">
              <a
                href={`mailto:${challengeConstants.contact.email}`}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {challengeConstants.contact.email}
              </a>
              <a
                href={`tel:${challengeConstants.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {challengeConstants.contact.phone}
              </a>
            </div>
          </div>

          <div className="md:text-right">
            <h3 className="text-xl font-bold mb-4">
              {challengeConstants.name}
            </h3>
            <p className="text-slate-400 text-sm">
              Shape the future of Thai healthcare with AI innovation.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 shadow-lg shadow-emerald-500/25 mb-4">
            Register Now
          </button>
          <p className="text-slate-500 text-sm">
            © 2026 {challengeConstants.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

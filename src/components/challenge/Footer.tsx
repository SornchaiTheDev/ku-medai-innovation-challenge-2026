import { Mail, Phone } from 'lucide-react'
import { challengeConstants } from '@/data/challenge-constants'
import AnimatedContent from '@/components/AnimatedContent'
import FadeContent from '@/components/FadeContent'
import StarBorder from '@/components/StarBorder'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <AnimatedContent distance={30} duration={0.5} delay={100}>
            <div>
              <h3 className="text-xl font-bold mb-4">Organized By</h3>
              <ul className="space-y-2 text-slate-400">
                {challengeConstants.organizers.map((organizer, index) => (
                  <li key={index}>{organizer}</li>
                ))}
              </ul>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={30} duration={0.5} delay={200}>
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
          </AnimatedContent>

          <AnimatedContent distance={30} duration={0.5} delay={300}>
            <div className="md:text-right">
              <h3 className="text-xl font-bold mb-4">
                {challengeConstants.name}
              </h3>
              <p className="text-slate-400 text-sm">
                Shape the future of Thai healthcare with AI innovation.
              </p>
            </div>
          </AnimatedContent>
        </div>

        <FadeContent duration={800} delay={500}>
          <div className="border-t border-slate-800 pt-8 text-center">
            <StarBorder
              as="button"
              color="#50d8af"
              speed="4s"
              thickness={2}
              variant="emerald"
              className="font-semibold"
              onClick={() => alert('Registration coming soon!')}
            >
              Register Now
            </StarBorder>
            <p className="text-slate-500 text-sm mt-4">
              © 2026 {challengeConstants.name}. All rights reserved.
            </p>
          </div>
        </FadeContent>
      </div>
    </footer>
  )
}

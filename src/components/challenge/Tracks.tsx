import { challengeConstants } from '@/data/challenge-constants'
import AnimatedContent from '@/components/AnimatedContent'
import FadeContent from '@/components/FadeContent'

export default function Tracks() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <FadeContent duration={800}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your Battlefield
            </h2>
            <p className="text-slate-400">
              Teams must select one of the following tracks:
            </p>
            <div className="w-20 h-1 bg-emerald-500 mx-auto mt-4" />
          </div>
        </FadeContent>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {challengeConstants.tracks.map((track, index) => (
            <AnimatedContent
              key={track.id}
              distance={50}
              duration={0.6}
              delay={200 + index * 200}
              ease="power2.out"
            >
              <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <track.icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {track.title}
                    </h3>
                    <p className="text-sm text-emerald-400 font-medium">
                      {track.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-slate-400 italic mb-6">{track.focus}</p>

                <h4 className="font-semibold text-white mb-3">
                  Challenge Areas:
                </h4>
                <ul className="space-y-2 flex-1">
                  {track.challenges.map((challenge, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}

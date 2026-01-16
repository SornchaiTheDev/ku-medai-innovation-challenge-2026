import { challengeConstants } from '@/data/challenge-constants'
import AnimatedContent from '@/components/AnimatedContent'
import FadeContent from '@/components/FadeContent'

export default function About() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <FadeContent duration={800}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Shape the Future of Intelligent Wellness
            </h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto" />
          </div>
        </FadeContent>

        <FadeContent duration={800} delay={200}>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-lg text-slate-300 leading-relaxed">
              Artificial Intelligence is reshaping how we treat patients, manage
              hospitals, and protect our farmers.{' '}
              <span className="font-semibold text-emerald-400">
                The {challengeConstants.name}
              </span>{' '}
              is your platform to apply classroom knowledge to real-world
              problems.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mt-4">
              Whether you are a coder, a future doctor, or a creative thinker,
              we want you to create innovations that support Thailand&apos;s
              strategy to become a global{' '}
              <span className="font-semibold text-emerald-400">
                Medical Hub
              </span>
              .
            </p>
          </div>
        </FadeContent>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {challengeConstants.benefits.map((benefit, index) => (
            <AnimatedContent
              key={index}
              distance={40}
              duration={0.5}
              delay={400 + index * 100}
              ease="power2.out"
            >
              <div className="p-6 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all group h-full flex flex-col">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors">
                  <benefit.icon className="w-6 h-6 text-emerald-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-400 text-sm">{benefit.description}</p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}

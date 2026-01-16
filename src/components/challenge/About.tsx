import { challengeConstants } from '@/data/challenge-constants'

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Shape the Future of Intelligent Wellness
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg text-slate-600 leading-relaxed">
            Artificial Intelligence is reshaping how we treat patients, manage
            hospitals, and protect our farmers.{' '}
            <span className="font-semibold text-emerald-600">
              The {challengeConstants.name}
            </span>{' '}
            is your platform to apply classroom knowledge to real-world
            problems.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mt-4">
            Whether you are a coder, a future doctor, or a creative thinker, we
            want you to create innovations that support Thailand&apos;s strategy
            to become a global{' '}
            <span className="font-semibold">Medical Hub</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challengeConstants.benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors">
                <benefit.icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                {benefit.title}
              </h3>
              <p className="text-slate-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { challengeConstants } from '@/data/challenge-constants'

export default function Prizes() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Awards & Recognition
          </h2>
          <p className="text-slate-400">
            Total Prize Pool:{' '}
            <span className="font-semibold text-emerald-400">65,000+ THB</span>
          </p>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mt-4" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {challengeConstants.prizes.map((prize, index) => (
              <div
                key={index}
                className={`relative p-6 rounded-xl text-center ${
                  index === 0
                    ? 'bg-gradient-to-br from-amber-900/50 to-yellow-900/30 border-2 border-amber-600/50'
                    : index === 1
                      ? 'bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700'
                      : index === 2
                        ? 'bg-gradient-to-br from-orange-900/40 to-amber-900/20 border border-orange-700/40'
                        : 'bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700'
                }`}
              >
                {index === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-3xl">{prize.badge}</span>
                  </div>
                )}
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-3xl">{prize.badge}</span>
                  </div>
                )}
                {index === 2 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-3xl">{prize.badge}</span>
                  </div>
                )}
                {index >= 3 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-3xl">{prize.badge}</span>
                  </div>
                )}

                <div className="mt-4 mb-3">
                  <span className="text-3xl">{prize.badge}</span>
                </div>
                <h3 className="font-bold text-white mb-1">{prize.placement}</h3>
                <p className="text-xl font-bold text-emerald-400">
                  {prize.prize}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 text-sm mt-8">
            * All finalists will receive a certificate of participation.
          </p>
        </div>
      </div>
    </section>
  )
}

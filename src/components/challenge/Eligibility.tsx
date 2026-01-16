import { challengeConstants } from '@/data/challenge-constants'

export default function Eligibility() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Are You Ready?
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-slate-800 border border-slate-700">
              <h3 className="font-semibold text-emerald-400 mb-2">
                Who Can Join?
              </h3>
              <p className="text-slate-300">
                {challengeConstants.eligibility.who}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800 border border-slate-700">
              <h3 className="font-semibold text-emerald-400 mb-2">Team Size</h3>
              <p className="text-slate-300">
                {challengeConstants.eligibility.teamSize}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800 border border-slate-700 md:col-span-2">
              <h3 className="font-semibold text-emerald-400 mb-2">
                Recommended Composition
              </h3>
              <p className="text-slate-300">
                {challengeConstants.eligibility.composition}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-emerald-900/30 border border-emerald-500/30 md:col-span-2">
              <h3 className="font-semibold text-emerald-400 mb-2">
                Expected Output
              </h3>
              <p className="text-slate-300">
                {challengeConstants.eligibility.output}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">
              How You Will Be Judged
            </h3>
            <p className="text-slate-400">Score Breakdown (100 Points)</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {challengeConstants.judgingCriteria.map((criteria, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-slate-800 border border-slate-700 text-center"
              >
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {criteria.percentage}%
                </div>
                <p className="text-sm text-slate-300">{criteria.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

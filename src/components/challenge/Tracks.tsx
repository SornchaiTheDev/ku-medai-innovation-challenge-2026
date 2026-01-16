import { challengeConstants } from '@/data/challenge-constants'

export default function Tracks() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Choose Your Battlefield
          </h2>
          <p className="text-slate-600">
            Teams must select one of the following tracks:
          </p>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {challengeConstants.tracks.map((track) => (
            <div
              key={track.id}
              className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:border-emerald-200 transition-all hover:shadow-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <track.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {track.title}
                  </h3>
                  <p className="text-sm text-emerald-600 font-medium">
                    {track.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-slate-600 italic mb-6">{track.focus}</p>

              <h4 className="font-semibold text-slate-800 mb-3">
                Challenge Areas:
              </h4>
              <ul className="space-y-2">
                {track.challenges.map((challenge, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-slate-600"
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

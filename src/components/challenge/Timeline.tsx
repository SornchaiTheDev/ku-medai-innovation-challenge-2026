import { challengeConstants, timelineIconMap } from '@/data/challenge-constants'

export default function Timeline() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Road to Demo Day
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto" />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-emerald-500/30 md:left-1/2 md:-translate-x-1/2 hidden md:block" />

            <div className="space-y-6">
              {challengeConstants.timeline.map((item, index) => {
                const Icon: React.ElementType =
                  timelineIconMap[item.icon] ?? timelineIconMap.megaphone
                const isEven = index % 2 === 0

                return (
                  <div
                    key={index}
                    className={`relative flex items-start gap-4 md:gap-6 ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="md:hidden flex flex-col items-center gap-3 w-full">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-emerald-400" />
                        </div>
                      </div>
                      <div className="flex-1 text-center">
                        <span className="text-sm font-semibold text-emerald-400">
                          {item.date}
                        </span>
                        <p className="font-semibold text-white">{item.label}</p>
                        {item.description && (
                          <p className="text-slate-500 text-sm">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 hidden md:block md:text-right">
                      <span className="text-sm font-semibold text-emerald-400">
                        {item.date}
                      </span>
                      <p className="font-semibold text-white text-lg">
                        {item.label}
                      </p>
                      {item.description && (
                        <p className="text-slate-500 text-sm">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="hidden md:flex w-16 h-16 bg-slate-800 rounded-full items-center justify-center border-2 border-emerald-500/30 z-10 flex-shrink-0">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>

                    <div className="flex-1 hidden md:block" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

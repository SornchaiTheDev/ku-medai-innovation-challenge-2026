import { challengeConstants, timelineIconMap } from '@/data/challenge-constants'

export default function Timeline() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Road to Demo Day
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-emerald-200 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-8">
              {challengeConstants.timeline.map((item, index) => {
                const Icon: React.ElementType =
                  timelineIconMap[item.icon] ?? timelineIconMap.megaphone
                const isEven = index % 2 === 0

                return (
                  <div
                    key={index}
                    className={`relative flex items-center gap-6 ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="flex-1 md:text-right">
                      <div className={`md:hidden`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-emerald-600">
                              {item.date}
                            </span>
                            <p className="font-semibold text-slate-800">
                              {item.label}
                            </p>
                            {item.description && (
                              <p className="text-slate-500 text-sm">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <span className="text-sm font-semibold text-emerald-600">
                          {item.date}
                        </span>
                        <p className="font-semibold text-slate-800 text-lg">
                          {item.label}
                        </p>
                        {item.description && (
                          <p className="text-slate-500 text-sm">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="hidden md:flex w-16 h-16 bg-white rounded-full items-center justify-center border-2 border-emerald-200 z-10">
                      <Icon className="w-6 h-6 text-emerald-600" />
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

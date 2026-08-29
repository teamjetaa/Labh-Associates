const values = [
  {
    title: 'Transparency',
    subtitle: '"Where Transparency Meets Financial Expertise"',
    icon: 'ri-shield-check-line',
  },
  {
    title: 'Integrity',
    subtitle: '"Integrity at the Core of Financial Guidance"',
    icon: 'ri-hand-heart-line',
  },
  {
    title: 'Client-Centric',
    subtitle: '"Client-Centric Excellence in Financial Consulting"',
    icon: 'ri-user-star-line',
  },
  {
    title: 'Ethical',
    subtitle: '"Empowering you through ethical wealth management"',
    icon: 'ri-plant-line',
  },
];

export default function ValuesSection() {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => (
          <div
            key={value.title}
            className={`relative px-6 md:px-8 py-10 md:py-14 group cursor-default transition-all duration-300 ${
              index % 2 === 0
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-background-200 text-foreground-900 hover:bg-primary-500 hover:text-white'
            }`}
          >
            <div className="space-y-3">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${
                  index % 2 === 0
                    ? 'bg-white/20'
                    : 'bg-primary-100 text-primary-600 group-hover:bg-white/20 group-hover:text-white'
                }`}
              >
                <span className="w-6 h-6 flex items-center justify-center">
                  <i className={value.icon} />
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-heading">
                {value.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  index % 2 === 0 ? 'text-white/80' : 'text-foreground-600 group-hover:text-white/80'
                }`}
              >
                {value.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
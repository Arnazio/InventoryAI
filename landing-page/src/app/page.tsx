export default function Home() {
  const year = new Date().getFullYear();
  const valuePoints = [
    {
      title: "Know what to buy and when",
      description:
        "Rely on one forward-looking plan built from sales velocity, supplier constraints, and market signals.",
    },
    {
      title: "Protect working capital",
      description:
        "Slim inventory by uncovering slow-movers and rebalancing stock before it becomes stranded cash.",
    },
    {
      title: "Coordinate every stakeholder",
      description:
        "Give operations, finance, and merchandising a shared source of truth with live plan updates.",
    },
  ];

  const capabilities = [
    {
      label: "Forecast Studio",
      blurb:
        "Blend historical demand with external drivers to produce item-level forecasts your planners can trust.",
    },
    {
      label: "Replenishment Orchestrator",
      blurb:
        "Translate demand plans into purchase orders automatically, aligned with supplier lead times and MOQ.",
    },
    {
      label: "Inventory Health Monitor",
      blurb:
        "Spot overstocks, stockouts, and aging SKUs instantly with dashboards tailored to your network.",
    },
  ];

  const process = [
    {
      title: "Import & harmonise your data",
      detail:
        "Connect POS, ERP, and supplier feeds. InventoryAI cleans, enriches, and aligns them overnight.",
    },
    {
      title: "Generate a forward plan",
      detail:
        "Scenario test and approve AI-backed demand plans, then release replenishment recommendations in a click.",
    },
    {
      title: "Monitor, learn, refine",
      detail:
        "Track accuracy, adapt to market shifts, and continuously improve through guided reviews with our team.",
    },
  ];

  const testimonials = [
    {
      quote:
        "InventoryAI helped us replace spreadsheets with a planning rhythm that's finally predictable.",
      author: "Nathalie Verhoeven",
      role: "COO, Arcadia Retail Collective",
    },
    {
      quote:
        "We released €420K in tied-up stock within the first quarter while service levels climbed.",
      author: "Jonas Claes",
      role: "Head of Operations, Lumis Distribution",
    },
  ];

  const stats = [
    { value: "18%", label: "Reduction in working capital tied to stock" },
    { value: "92%", label: "Forecast accuracy after 10 weeks" },
    { value: "45 hrs", label: "Planning time saved per month" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.48em] text-slate-400">
              InventoryAI
            </span>
            <span className="hidden text-sm text-slate-500 sm:inline">
              Intelligent inventory planning
            </span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a className="transition-colors hover:text-foreground" href="#platform">
              Platform
            </a>
            <a className="transition-colors hover:text-foreground" href="#approach">
              Approach
            </a>
            <a className="transition-colors hover:text-foreground" href="#results">
              Results
            </a>
            <a className="transition-colors hover:text-foreground" href="#stories">
              Stories
            </a>
          </nav>
          <a
            href="#contact"
            className="rounded-full border border-black/10 bg-foreground px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10"
          >
            Request a walkthrough
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 rounded-l-[120px] bg-gradient-to-l from-slate-100 to-transparent lg:block" />
          <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:gap-16">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-500">
                Built for modern operations teams
              </div>
              <div className="space-y-6">
                <h1 className="max-w-3xl text-4xl font-medium leading-tight text-slate-900 sm:text-5xl">
                  Inventory clarity, without the noise. Plan with{" "}
                  <span className="text-[var(--color-accent)]">confidence</span>.
                </h1>
                <p className="max-w-xl text-lg text-slate-600">
                  InventoryAI transforms fragmented data into a single, actionable plan. Forecast
                  demand, orchestrate replenishment, and align every stakeholder around the numbers
                  that matter.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10"
                >
                  Book a private pilot
                </a>
                <a
                  href="#results"
                  className="flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-black/30 hover:text-foreground"
                >
                  Explore the outcomes
                </a>
              </div>
            </div>
            <div className="mt-14 space-y-6 rounded-3xl border border-black/5 bg-white p-10 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] lg:mt-0">
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Snapshot</p>
              <div className="space-y-4">
                <h2 className="text-3xl font-medium text-slate-900">From data to decisive action</h2>
                <p className="text-sm text-slate-500">
                  Visualise demand surges, align supply plans, and highlight exceptions before they
                  erode margins.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-left"
                  >
                    <span className="text-2xl font-semibold text-slate-900">{item.value}</span>
                    <p className="mt-2 text-xs text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="platform" className="border-t border-black/5 bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-400">
                  Why InventoryAI
                </p>
                <h2 className="text-3xl font-semibold text-slate-900">
                  Designed for planners who demand more signal and less noise.
                </h2>
                <p className="text-base text-slate-600">
                  We pair explainable AI with human context. Every recommendation references the data
                  and assumptions behind it—so your teams stay confident, not cautious.
                </p>
              </div>
              <div className="grid gap-6">
                {valuePoints.map((point) => (
                  <div
                    key={point.title}
                    className="rounded-3xl border border-slate-100 bg-slate-50/70 p-6 transition hover:border-slate-200 hover:bg-slate-50"
                  >
                    <h3 className="text-lg font-medium text-slate-900">{point.title}</h3>
                    <p className="mt-3 text-sm text-slate-600">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-black/5 bg-slate-50/60 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-400">
                  Platform
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-900">
                  Every layer designed to deliver operational clarity.
                </h2>
              </div>
              <a
                href="#contact"
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-black/30 hover:text-foreground"
              >
                See a tailored demo
              </a>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {capabilities.map((capability) => (
                <article
                  key={capability.label}
                  className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-7 shadow-[0_20px_45px_-40px_rgba(15,23,42,0.5)]"
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-400">
                      {capability.label}
                    </span>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">
                      {capability.blurb}
                    </p>
                  </div>
                  <div className="mt-6 h-0.5 w-16 rounded-full bg-[var(--color-accent)]" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="border-t border-black/5 bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-400">
                  Our approach
                </p>
                <h2 className="text-3xl font-semibold text-slate-900">
                  Guided onboarding that respects your context and pace.
                </h2>
                <p className="text-base text-slate-600">
                  We pair the platform with experts who have built planning teams across retail,
                  distribution, and manufacturing. From data ingestion to change management, they stay
                  on the journey with you.
                </p>
              </div>
              <div className="grid gap-6">
                {process.map((step, index) => (
                  <div
                    key={step.title}
                    className="relative rounded-3xl border border-slate-100 bg-slate-50/70 p-6"
                  >
                    <span className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full border border-white bg-[var(--color-accent)] text-sm font-semibold text-white shadow-lg">
                      0{index + 1}
                    </span>
                    <h3 className="mt-4 text-lg font-medium text-slate-900">{step.title}</h3>
                    <p className="mt-3 text-sm text-slate-600">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="results" className="border-t border-black/5 bg-slate-900 text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-white/60">
                Proven outcomes
              </p>
              <h2 className="text-3xl font-semibold">
                A faster, calmer planning rhythm in the first 90 days.
              </h2>
              <p className="text-base text-white/70">
                Whether you measure success by service level, margin, or cash unlocked, our pilots are
                structured to deliver tangible results within a quarter—and the data to back them up.
              </p>
            </div>
            <div className="grid gap-6 md:w-96">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Pilot snapshot</p>
                <div className="mt-6 flex items-baseline justify-between">
                  <div>
                    <p className="text-4xl font-semibold text-white">70%↑</p>
                    <p className="mt-2 text-xs text-white/60">Improvement in forecast stability</p>
                  </div>
                  <div>
                    <p className="text-4xl font-semibold text-white">€350K</p>
                    <p className="mt-2 text-xs text-white/60">Working capital freed in 6 months</p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-white/70">
                  Weekly governance with your planning leads and finance keeps the gains on track.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Support</p>
                <p className="mt-4 text-sm text-white/70">
                  Dedicated success partner, bi-weekly optimisation workshops, and insight packs for
                  your leadership team.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="stories" className="border-t border-black/5 bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
              <div className="max-w-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-400">
                  Client stories
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-900">
                  Trusted by leading Belgian retailers, distributors, and manufacturers.
                </h2>
              </div>
              <div className="flex gap-6 text-sm text-slate-500">
                <span>Arcadia Group</span>
                <span>Lumis Distribution</span>
                <span>Marlin Manufacturing</span>
              </div>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <blockquote
                  key={testimonial.author}
                  className="flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-slate-50/70 p-8"
                >
                  <p className="text-lg leading-relaxed text-slate-700">
                    “{testimonial.quote}”
                  </p>
                  <footer className="mt-6 text-sm text-slate-500">
                    <span className="font-medium text-slate-700">{testimonial.author}</span>
                    <span className="mx-2 text-slate-300">•</span>
                    {testimonial.role}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-black/5 bg-slate-50/80 py-20">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
              Begin your pilot
            </p>
            <h2 className="text-3xl font-semibold text-slate-900">
              Stop reacting to yesterday’s stock levels. Start steering tomorrow’s plan.
            </h2>
            <p className="max-w-2xl text-base text-slate-600">
              Share your current planning setup and we’ll curate a pilot geared to prove the business
              case in under 12 weeks.
            </p>
            <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:hello@inventory.ai"
                className="flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 sm:w-auto"
              >
                hello@inventory.ai
              </a>
              <a
                href="#"
                className="flex w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-black/30 hover:text-foreground sm:w-auto"
              >
                Download pilot brief
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <span>© {year} InventoryAI. All rights reserved.</span>
          <div className="flex gap-6">
            <a className="hover:text-foreground" href="#">
              Privacy
            </a>
            <a className="hover:text-foreground" href="#">
              Terms
            </a>
            <a className="hover:text-foreground" href="#">
              Security
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

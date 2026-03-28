export default function HomePage({ onStart }) {
  return (
    <div className="min-h-screen bg-[#08111f] text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#08111f]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-extrabold tracking-wide">
            DragonDSA
          </h1>

          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#idea" className="hover:text-white">Idea</a>
            <a href="#play" className="hover:text-white">Play</a>
          </nav>

          <button
            onClick={onStart}
            className="rounded-full bg-cyan-400 px-5 py-2 font-semibold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.35)] transition hover:scale-105 hover:bg-cyan-300"
          >
            Start the Game
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_45%)]" />
        <div className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">
          
          <div className="relative z-10">
            <p className="mb-4 inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
              Learn DSA through adventure
            </p>

            <h2 className="text-5xl font-extrabold leading-tight md:text-7xl">
              Game based
              <span className="block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                DSA learning
              </span>
              made fun
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Instead of memorizing theory, players explore a fantasy world and
              solve DSA questions by entering challenge zones. Basic to advanced
              concepts unlock as you progress.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={onStart}
                className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.35)] transition hover:scale-105"
              >
                Start the Game
              </button>

              <a
                href="#idea"
                className="rounded-full border border-white/20 px-6 py-3 font-medium text-white transition hover:bg-white/10"
              >
                Explore Idea
              </a>
            </div>
          </div>

          <div className="relative z-10 flex justify-center">
            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-3xl" />
              <img
                src="/dragon-island.png"
                alt="Dragon island world"
                className="relative z-10 w-full rounded-[2rem] border border-white/10 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h3 className="text-4xl font-extrabold">
            Game creation, <span className="text-cyan-300">intuitive for all</span>
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Explore zones, trigger questions, answer correctly, gain score, and
            move through increasingly difficult DSA topics.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h4 className="text-xl font-bold text-white">Interactive Learning</h4>
            <p className="mt-3 text-slate-300">
              Learn arrays, strings, linked lists, stacks, trees, and graphs
              through playable zones instead of boring notes.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h4 className="text-xl font-bold text-white">Quiz Encounters</h4>
            <p className="mt-3 text-slate-300">
              Enter a zone and instantly face a concept-based MCQ challenge.
              Correct answers push your journey forward.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h4 className="text-xl font-bold text-white">Progression System</h4>
            <p className="mt-3 text-slate-300">
              Start with basics, then move into intermediate and advanced DSA
              concepts as your score and confidence grow.
            </p>
          </div>
        </div>
      </section>

      {/* Idea Section */}
      <section
        id="idea"
        className="bg-gradient-to-b from-[#120d2f] to-[#1b1244] px-6 py-20"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-4xl font-extrabold">
              Publish your learning
              <span className="block text-cyan-300"> in a playable format</span>
            </h3>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              This project turns DSA preparation into a fantasy exploration game.
              Each zone represents a topic. Every correct answer builds progress.
              Learning becomes visual, memorable, and fun.
            </p>

            <button
              onClick={onStart}
              className="mt-8 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:scale-105"
            >
              Enter the World
            </button>
          </div>

          <div className="flex justify-center">
            <img
              src="/game-landing.png"
              alt="Game style landing art"
              className="w-full max-w-xl rounded-[2rem] border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-slate-400">
        Built for making DSA learning feel like a real adventure.
      </footer>
    </div>
  );
}
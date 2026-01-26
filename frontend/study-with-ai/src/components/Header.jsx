export default function Header() {
  return (
    <header className="w-full">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-sm shadow-black/20">
          <span className="text-sm font-semibold tracking-tight text-zinc-100">
            S
          </span>
        </div>

        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
            Study With AI
          </h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Turn your notes into flashcards, quizzes, summaries and more —
            instantly.
          </p>
        </div>
      </div>
    </header>
  )
}

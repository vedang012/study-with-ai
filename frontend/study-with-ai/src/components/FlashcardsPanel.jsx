export default function FlashcardsPanel({
  flashcards,
  openIndex,
  onToggle,
  status,
}) {
  const hasCards = Array.isArray(flashcards) && flashcards.length > 0

  return (
    <aside className="w-full">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-2xl shadow-black/20 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Flashcards</h2>
            <p className="mt-1 text-xs text-zinc-400">
              Click a card to reveal the answer.
            </p>
          </div>
          {hasCards ? (
            <span className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-2 py-1 text-[11px] tabular-nums text-zinc-300">
              {flashcards.length} cards
            </span>
          ) : null}
        </div>

        <div className="mt-4">
          {!hasCards ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/30 p-4">
              <p className="text-sm text-zinc-200">
                {status === 'loading'
                  ? 'Generating flashcards…'
                  : 'Your flashcards will appear here.'}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Paste notes, then click “Generate Flashcards”.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {flashcards.map((card, idx) => {
                const isOpen = openIndex === idx
                return (
                  <li key={`${idx}-${card?.question ?? 'card'}`}>
                    <button
                      type="button"
                      onClick={() => onToggle?.(idx)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950/30 p-4 text-left shadow-sm shadow-black/20 transition hover:border-zinc-700 hover:bg-zinc-950/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
                      aria-expanded={isOpen ? 'true' : 'false'}
                    >
                      <p className="text-sm font-medium text-zinc-50">
                        {card?.question || 'Untitled question'}
                      </p>
                      {isOpen ? (
                        <div className="mt-3 border-t border-zinc-800 pt-3">
                          <p className="text-xs font-semibold text-zinc-300">
                            Answer
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-zinc-200">
                            {card?.answer || '—'}
                          </p>
                        </div>
                      ) : (
                        <p className="mt-2 text-xs text-zinc-500">
                          Tap to reveal
                        </p>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </aside>
  )
}

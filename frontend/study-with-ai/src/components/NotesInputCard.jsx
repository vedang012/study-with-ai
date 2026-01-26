import ActionButtonsGrid from './ActionButtonsGrid.jsx'

export default function NotesInputCard({ value, onChange, onAction }) {
  const characterCount = value?.length ?? 0

  return (
    <section className="w-full">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-2xl shadow-black/20 sm:p-6">
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-zinc-200"
          >
            Notes
          </label>
          <div className="mt-2">
            <textarea
              id="notes"
              name="notes"
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              placeholder="Paste your class notes, textbook content, or study material here..."
              className="min-h-[260px] w-full resize-y rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 text-sm leading-relaxed text-zinc-100 shadow-inner shadow-black/20 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
            />
          </div>

          <div className="mt-2 flex items-center justify-end">
            <span
              className="text-xs tabular-nums text-zinc-500"
              aria-live="polite"
            >
              {characterCount.toLocaleString()} characters
            </span>
          </div>
        </div>

        <div className="mt-6 border-t border-zinc-800 pt-5">
          <h2 className="text-sm font-semibold text-zinc-100">
            What would you like to generate?
          </h2>
          <p className="mt-1 text-xs text-zinc-400">
            Choose any option — you can try multiple.
          </p>

          <div className="mt-4">
            <ActionButtonsGrid onAction={onAction} />
          </div>
        </div>
      </div>
    </section>
  )
}

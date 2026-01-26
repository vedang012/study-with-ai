export default function SummaryPanel({ summaryText, status }) {
  const text = summaryText?.toString?.() ?? ''

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-2xl shadow-black/20 sm:p-6">
      <div>
        <h2 className="text-sm font-semibold text-zinc-100">Summary</h2>
        <p className="mt-1 text-xs text-zinc-400">
          A short, clear overview of your notes.
        </p>
      </div>

      <div className="mt-4">
        {!text ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/30 p-4">
            <p className="text-sm text-zinc-200">
              {status === 'loading'
                ? 'Generating summary…'
                : 'Your summary will appear here.'}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Paste notes, then click “Generate Summary”.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/30 p-4">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
              {text}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function TheoryPanel({ text, status }) {
  const value = text?.toString?.() ?? ''

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-2xl shadow-black/20 sm:p-6">
      <div>
        <h2 className="text-sm font-semibold text-zinc-100">Theory Answer</h2>
        <p className="mt-1 text-xs text-zinc-400">
          Exam-ready descriptive answer.
        </p>
      </div>

      <div className="mt-4">
        {!value ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/30 p-4">
            <p className="text-sm text-zinc-200">
              {status === 'loading'
                ? 'Generating theory answer…'
                : 'Your answer will appear here.'}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Paste notes, then click “Create Theory Answer”.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/30 p-4">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
              {value}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

import { useMemo, useState } from 'react'

function normalizeOptionKey(key) {
  const value = String(key || '').trim().toLowerCase()
  return ['a', 'b', 'c', 'd'].includes(value) ? value : null
}

export default function QuizPanel({ questions, status }) {
  const normalized = useMemo(() => {
    if (!Array.isArray(questions)) return []
    return questions
      .map((q) => ({
        question: q?.question?.toString?.() ?? '',
        options: {
          a: q?.a?.toString?.() ?? '',
          b: q?.b?.toString?.() ?? '',
          c: q?.c?.toString?.() ?? '',
          d: q?.d?.toString?.() ?? '',
        },
        answer: normalizeOptionKey(q?.answer),
      }))
      .filter((q) => q.question)
  }, [questions])

  const [selected, setSelected] = useState({})
  const [submitted, setSubmitted] = useState({})

  const hasQuiz = normalized.length > 0

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-2xl shadow-black/20 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-zinc-100">MCQ Quiz</h2>
          <p className="mt-1 text-xs text-zinc-400">
            Choose an option, then submit each question.
          </p>
        </div>
        {hasQuiz ? (
          <span className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-2 py-1 text-[11px] tabular-nums text-zinc-300">
            {normalized.length} questions
          </span>
        ) : null}
      </div>

      <div className="mt-4">
        {!hasQuiz ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/30 p-4">
            <p className="text-sm text-zinc-200">
              {status === 'loading'
                ? 'Generating quiz…'
                : 'Your quiz will appear here.'}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Paste notes, then click “Generate MCQ Quiz”.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {normalized.map((q, idx) => {
              const selectedKey = selected[idx] ?? null
              const isSubmitted = Boolean(submitted[idx])
              const correctKey = q.answer

              return (
                <div
                  key={`${idx}-${q.question}`}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/30 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-zinc-50">
                      {idx + 1}. {q.question}
                    </p>
                    {isSubmitted ? (
                      <span
                        className={
                          selectedKey && correctKey && selectedKey === correctKey
                            ? 'rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-200'
                            : 'rounded-md border border-rose-500/30 bg-rose-500/10 px-2 py-1 text-[11px] text-rose-200'
                        }
                      >
                        {selectedKey && correctKey && selectedKey === correctKey
                          ? 'Correct'
                          : 'Incorrect'}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-2">
                    {['a', 'b', 'c', 'd'].map((key) => {
                      const optionText = q.options[key]
                      if (!optionText) return null

                      const isCorrect = Boolean(correctKey) && key === correctKey
                      const isChosen = selectedKey === key

                      const base =
                        'flex w-full items-start gap-3 rounded-lg border px-3 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60'

                      const styleWhenSubmitted = isCorrect
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'
                        : isChosen
                          ? 'border-rose-500/30 bg-rose-500/10 text-rose-100'
                          : 'border-zinc-800 bg-zinc-950/20 text-zinc-200'

                      const styleWhenNotSubmitted = isChosen
                        ? 'border-indigo-400/40 bg-indigo-400/10 text-zinc-100'
                        : 'border-zinc-800 bg-zinc-950/20 text-zinc-200 hover:border-zinc-700'

                      return (
                        <button
                          key={key}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => setSelected((s) => ({ ...s, [idx]: key }))}
                          className={`${base} ${
                            isSubmitted
                              ? `${styleWhenSubmitted} disabled:cursor-not-allowed disabled:opacity-90`
                              : styleWhenNotSubmitted
                          }`}
                          aria-pressed={isChosen ? 'true' : 'false'}
                        >
                          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950/40 text-[11px] font-semibold uppercase text-zinc-200">
                            {key}
                          </span>
                          <span className="leading-relaxed">{optionText}</span>
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    {isSubmitted && correctKey ? (
                      <p className="text-xs text-zinc-400">
                        Correct option: <span className="font-semibold text-zinc-200">{correctKey.toUpperCase()}</span>
                      </p>
                    ) : (
                      <span />
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        if (!selectedKey) {
                          window.alert('Select an option first.')
                          return
                        }
                        setSubmitted((s) => ({ ...s, [idx]: true }))
                      }}
                      disabled={isSubmitted}
                      className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-xs font-medium text-zinc-200 shadow-sm shadow-black/20 transition hover:border-zinc-700 hover:bg-zinc-950/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitted ? 'Submitted' : 'Submit'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

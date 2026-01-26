const ACTIONS = [
  {
    key: 'flashcards',
    title: 'Generate Flashcards',
    description: 'Quick Q&A cards for revision',
    Icon: BrainIcon,
  },
  {
    key: 'mcq',
    title: 'Generate MCQ Quiz',
    description: 'Test yourself with multiple choice questions',
    Icon: ChecklistIcon,
  },
  {
    key: 'summary',
    title: 'Generate Summary',
    description: 'Short and clear overview of your notes',
    Icon: DocumentIcon,
  },
  {
    key: 'theory',
    title: 'Create Theory Answer',
    description: 'Exam-ready descriptive answers',
    Icon: PencilIcon,
  },
]

export default function ActionButtonsGrid({ onAction }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {ACTIONS.map(({ key, title, description, Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onAction?.(key)}
          className="group relative flex w-full items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/30 p-4 text-left shadow-sm shadow-black/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-0 hover:border-zinc-700 hover:bg-zinc-950/50"
        >
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-200 transition group-hover:border-indigo-400/40 group-hover:text-zinc-50">
            <Icon className="h-5 w-5" />
          </span>

          <span className="min-w-0">
            <span className="block text-sm font-medium text-zinc-50">
              {title}
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-zinc-400">
              {description}
            </span>
          </span>

          <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-indigo-400/20 transition group-hover:opacity-100" />
        </button>
      ))}
    </div>
  )
}

function BrainIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-2 3v1a3 3 0 0 0 2 3v1a3 3 0 0 0 3 3" />
      <path d="M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 2 3v1a3 3 0 0 1-2 3v1a3 3 0 0 1-3 3" />
      <path d="M9 8h1" />
      <path d="M14 8h1" />
      <path d="M9 12h2" />
      <path d="M13 12h2" />
      <path d="M10 16h4" />
    </svg>
  )
}

function ChecklistIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 6h12" />
      <path d="M9 12h12" />
      <path d="M9 18h12" />
      <path d="M3.5 6.5l1.5 1.5 2.5-3" />
      <path d="M3.5 12.5l1.5 1.5 2.5-3" />
      <path d="M3.5 18.5l1.5 1.5 2.5-3" />
    </svg>
  )
}

function DocumentIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M14 3v4a2 2 0 0 0 2 2h4" />
      <path d="M8 12h8" />
      <path d="M8 16h8" />
    </svg>
  )
}

function PencilIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z" />
    </svg>
  )
}

import FlashcardsPanel from './FlashcardsPanel.jsx'
import QuizPanel from './QuizPanel.jsx'
import SummaryPanel from './SummaryPanel.jsx'
import TheoryPanel from './TheoryPanel.jsx'

export default function OutputPanel({
  activeAction,
  loadingKey,
  flashcards,
  openFlashcardIndex,
  onToggleFlashcard,
  quizQuestions,
  quizKey,
  summaryText,
  theoryText,
}) {
  const isLoading = loadingKey === activeAction && Boolean(activeAction)
  const status = isLoading ? 'loading' : 'idle'

  if (activeAction === 'mcq') {
    return <QuizPanel key={quizKey} questions={quizQuestions} status={status} />
  }

  if (activeAction === 'summary') {
    return <SummaryPanel summaryText={summaryText} status={status} />
  }

  if (activeAction === 'theory') {
    return <TheoryPanel text={theoryText} status={status} />
  }

  // default to flashcards panel (also used when nothing selected yet)
  return (
    <FlashcardsPanel
      flashcards={flashcards}
      openIndex={openFlashcardIndex}
      onToggle={onToggleFlashcard}
      status={status}
    />
  )
}

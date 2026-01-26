import { useState } from 'react'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import NotesInputCard from './components/NotesInputCard.jsx'
import OutputPanel from './components/OutputPanel.jsx'
import { generateFromNotes } from './api/studyWithAiApi.js'

export default function App() {
  const [notes, setNotes] = useState('')
  const [loadingKey, setLoadingKey] = useState(null)
  const [abortController, setAbortController] = useState(null)

  const [activeAction, setActiveAction] = useState(null)

  const [flashcards, setFlashcards] = useState([])
  const [openFlashcardIndex, setOpenFlashcardIndex] = useState(null)

  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizKey, setQuizKey] = useState(0)

  const [summaryText, setSummaryText] = useState('')
  const [theoryText, setTheoryText] = useState('')

  async function handleAction(actionKey) {
    const trimmed = notes.trim()
    if (!trimmed) {
      window.alert('Paste some notes first.')
      return
    }

    setActiveAction(actionKey)

    // GET + long notes can exceed URL size limits.
    if (trimmed.length > 5000) {
      window.alert(
        'Notes are too long to safely send via GET query params. Use fewer characters or switch the API to POST.',
      )
      return
    }

    try {
      abortController?.abort()
      const controller = new AbortController()
      setAbortController(controller)

      setLoadingKey(actionKey)

      const data = await generateFromNotes({
        actionKey,
        notes: trimmed,
        signal: controller.signal,
      })

      if (actionKey === 'flashcards') {
        if (!Array.isArray(data)) {
          throw new Error('Flashcards response must be a JSON array.')
        }
        const normalized = data
          .map((item) => ({
            question: item?.question?.toString?.() ?? '',
            answer: item?.answer?.toString?.() ?? '',
          }))
          .filter((item) => item.question || item.answer)

        setFlashcards(normalized)
        setOpenFlashcardIndex(null)
        return
      }

      if (actionKey === 'mcq') {
        if (!Array.isArray(data)) {
          throw new Error('Quiz response must be a JSON array.')
        }
        setQuizQuestions(data)
        setQuizKey((k) => k + 1)
        return
      }

      if (actionKey === 'summary') {
        if (Array.isArray(data) && data[0] && typeof data[0] === 'object') {
          const maybe = data[0]?.summary
          if (typeof maybe === 'string') {
            setSummaryText(maybe)
            return
          }
        }
        if (typeof data === 'string') {
          setSummaryText(data)
          return
        }
        setSummaryText(JSON.stringify(data, null, 2))
        return
      }

      if (actionKey === 'theory') {
        if (typeof data === 'string') {
          setTheoryText(data)
          return
        }
        if (Array.isArray(data) && data[0] && typeof data[0] === 'object') {
          const maybe = data[0]?.answer ?? data[0]?.theory ?? data[0]?.result
          if (typeof maybe === 'string') {
            setTheoryText(maybe)
            return
          }
        }
        setTheoryText(JSON.stringify(data, null, 2))
      }
    } catch (e) {
      if (e?.name === 'AbortError') return
      window.alert(e?.message || 'Request failed.')
    } finally {
      setLoadingKey(null)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:gap-10 sm:py-14">
        <Header />

        <main className="flex flex-1 items-stretch">
          <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_420px]">
            <NotesInputCard
              value={notes}
              onChange={setNotes}
              onAction={handleAction}
              disabledActions={loadingKey !== null}
              loadingKey={loadingKey}
            />

            <div className="lg:sticky lg:top-14">
              <OutputPanel
                activeAction={activeAction}
                loadingKey={loadingKey}
                flashcards={flashcards}
                openFlashcardIndex={openFlashcardIndex}
                onToggleFlashcard={(idx) =>
                  setOpenFlashcardIndex((current) =>
                    current === idx ? null : idx,
                  )
                }
                quizQuestions={quizQuestions}
                quizKey={quizKey}
                summaryText={summaryText}
                theoryText={theoryText}
              />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

import { useState } from 'react'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import NotesInputCard from './components/NotesInputCard.jsx'

export default function App() {
  const [notes, setNotes] = useState('')

  function handleAction(actionKey) {
    // Hook your AI generation flows here.
    console.log('generate:', actionKey, { notesLength: notes.length })
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:gap-10 sm:py-14">
        <Header />

        <main className="flex flex-1 items-center justify-center">
          <NotesInputCard value={notes} onChange={setNotes} onAction={handleAction} />
        </main>

        <Footer />
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { PenLine, User, Pen, Trash2, ArrowLeft } from "lucide-react"
import { ProfileView } from "@/components/profile-view"

type Entry = { text: string; time: string; inProfile: boolean }

export function Hero() {
  const [selected, setSelected] = useState<"started" | "learn" | null>(null)
  const [entries, setEntries] = useState<Entry[]>([])
  const [pendingIndex, setPendingIndex] = useState<number | null>(null)
  const [view, setView] = useState<"home" | "profile">("home")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const anyInProfile = entries.some((e) => e.inProfile)

  function handleInput(e: React.FormEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }

  function confirmAddToProfile(index: number) {
    setEntries((prev) => prev.map((entry, i) => (i === index ? { ...entry, inProfile: true } : entry)))
    setPendingIndex(null)
  }

  function removeEntry(index: number) {
    setEntries((prev) => prev.filter((_, i) => i !== index))
    setPendingIndex(null)
  }

  function resetFlow() {
    setEntries([])
    setPendingIndex(null)
    setSelected(null)
    setView("home")
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const el = e.currentTarget
      const firstLine = el.value.split("\n")[0].trim()
      if (firstLine) {
        const time = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
        setEntries((prev) => [{ text: firstLine, time, inProfile: false }, ...prev])
      }
      el.value = ""
      el.style.height = "auto"
    }
  }

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      {view === "profile" && (
        <button
          type="button"
          onClick={resetFlow}
          aria-label="Start over"
          className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
          Start over
        </button>
      )}
      <span className="text-2xl font-extrabold tracking-tight text-foreground">OFF</span>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Button
          size="lg"
          variant={selected === "started" ? "default" : "outline"}
          onClick={() => setSelected("started")}
          className="hover:bg-primary hover:text-primary-foreground"
        >
          Get started
        </Button>
        <Button
          size="lg"
          variant={selected === "learn" ? "default" : "outline"}
          onClick={() => setSelected("learn")}
          className="hover:bg-primary hover:text-primary-foreground"
        >
          Learn more
        </Button>
      </div>
      <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
        Build something great, starting right here
      </h1>

      {view === "profile" ? (
        <p className="text-pretty text-lg font-semibold leading-relaxed text-foreground">Your Profile</p>
      ) : anyInProfile ? (
        <button
          type="button"
          onClick={() => setView("profile")}
          className="rounded-md text-pretty text-lg font-semibold leading-relaxed text-primary transition-all [text-shadow:0_0_12px_var(--color-primary)] hover:[text-shadow:0_0_20px_var(--color-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Visit Your Profile
        </button>
      ) : (
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Create a profile from your ideas
        </p>
      )}

      {view === "profile" ? (
        <ProfileView entries={entries.filter((e) => e.inProfile)} />
      ) : (
        <div className="flex w-full max-w-xl flex-col gap-3">
          {entries.length > 0 && (
            <ul className="flex max-h-[4rem] flex-col gap-1 overflow-y-auto pr-1 text-left [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {entries.map((entry, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-colors ${
                    entry.inProfile ? "bg-primary/15 ring-1 ring-primary" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setPendingIndex(pendingIndex === i ? null : i)}
                    aria-label="Add to profile"
                    className="shrink-0 rounded-full transition-all hover:[filter:drop-shadow(0_0_8px_var(--color-primary))] focus:outline-none"
                  >
                    <User className="h-6 w-6 text-primary" aria-hidden="true" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-semibold text-foreground">{entry.text}</p>
                    <p className="truncate text-sm text-muted-foreground">{entry.time}</p>
                  </div>
                  {pendingIndex === i ? (
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="text-sm text-muted-foreground">Add to profile?</span>
                      <Button size="sm" onClick={() => confirmAddToProfile(i)}>
                        Confirm
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setPendingIndex(null)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setPendingIndex(i)}
                        aria-label="Add to profile"
                        className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <Pen className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeEntry(i)}
                        aria-label="Delete entry"
                        className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
          <div className="flex w-full items-start gap-3 rounded-2xl border-2 border-primary bg-card px-5 py-4 shadow-[0_0_20px_-4px_var(--color-primary)]">
            <PenLine className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder="Where are you going?"
              aria-label="Search"
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              className="w-full resize-none overflow-hidden break-words bg-transparent text-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>
      )}
    </section>
  )
}

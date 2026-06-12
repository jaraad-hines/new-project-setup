"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PenLine, MapPin } from "lucide-react"

export function Hero() {
  const [selected, setSelected] = useState<"started" | "learn" | null>(null)
  const [entries, setEntries] = useState<string[]>([])

  function handleInput(e: React.FormEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const el = e.currentTarget
      const firstLine = el.value.split("\n")[0].trim()
      if (firstLine) {
        setEntries((prev) => [firstLine, ...prev])
      }
      el.value = ""
      el.style.height = "auto"
    }
  }

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <span className="text-2xl font-extrabold tracking-tight text-foreground">OFF</span>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Button
          size="lg"
          variant={selected === "started" ? "default" : "outline"}
          onClick={() => setSelected("started")}
        >
          Get started
        </Button>
        <Button
          size="lg"
          variant={selected === "learn" ? "default" : "outline"}
          onClick={() => setSelected("learn")}
        >
          Learn more
        </Button>
      </div>
      <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
        Build something great, starting right here
      </h1>
      <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
        Create a profile from your ideas
      </p>
      <div className="flex w-full max-w-xl flex-col gap-3">
        {entries.length > 0 && (
          <ul className="flex max-h-[7.5rem] flex-col gap-1 overflow-y-auto pr-1 text-left">
            {entries.map((entry, i) => (
              <li key={i} className="flex items-center gap-4 px-1 py-2">
                <MapPin className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-foreground">{entry}</p>
                  <p className="truncate text-sm text-muted-foreground">Recent destination</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="flex w-full items-start gap-3 rounded-2xl border-2 border-primary bg-card px-5 py-4 shadow-[0_0_20px_-4px_var(--color-primary)]">
          <PenLine className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
          <textarea
            rows={1}
            placeholder="Where are you going?"
            aria-label="Search"
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            className="w-full resize-none overflow-hidden break-words bg-transparent text-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>
    </section>
  )
}

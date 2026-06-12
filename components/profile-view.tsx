"use client"

import { User } from "lucide-react"

type Entry = { text: string; time: string; inProfile: boolean }

export function ProfileView({ entries }: { entries: Entry[] }) {
  return (
    <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-border">
      <img
        src="/figma/profile-bg.jpeg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative flex flex-col gap-3 p-6 text-left">
        {entries.length === 0 ? (
          <p className="py-8 text-center text-base text-white/70">No saved ideas yet.</p>
        ) : (
          entries.map((entry, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl border border-white/20 bg-black/30 px-4 py-3 backdrop-blur-sm"
            >
              <User className="h-6 w-6 shrink-0 text-white" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold text-white">{entry.text}</p>
                <p className="truncate text-sm text-white/70">{entry.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

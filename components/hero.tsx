import { Button } from "@/components/ui/button"
import { Pen } from "lucide-react"

export function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Button size="lg">Get started</Button>
        <Button size="lg" variant="outline">
          Learn more
        </Button>
      </div>
      <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
        Build something great, starting right here
      </h1>
      <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
        Create a profile from your ideas
      </p>
      <div className="flex w-full max-w-xl items-start gap-3 rounded-2xl border-2 border-primary bg-card px-5 py-4 shadow-[0_0_20px_-4px_var(--color-primary)]">
        <Pen className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
        <textarea
          rows={1}
          placeholder="Where are you going?"
          aria-label="Search"
          className="w-full resize-none break-words bg-transparent text-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
    </section>
  )
}

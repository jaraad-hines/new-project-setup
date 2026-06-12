import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <span className="rounded-full border border-border px-4 py-1 text-sm font-medium text-muted-foreground">
        Welcome
      </span>
      <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
        Build something great, starting right here
      </h1>
      <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
        This is your hero section. Everything starts from a single bold idea. Add the rest of your
        page below when you&apos;re ready.
      </p>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Button size="lg">Get started</Button>
        <Button size="lg" variant="outline">
          Learn more
        </Button>
      </div>
    </section>
  )
}

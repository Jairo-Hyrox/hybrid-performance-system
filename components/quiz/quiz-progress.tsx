interface QuizProgressProps {
  current: number
  total: number
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const pct = Math.round((current / total) * 100)

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <span>
          {current} / {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-surface"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Pregunta ${current} de ${total}`}
      >
        <div
          className="h-full rounded-full bg-volt transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

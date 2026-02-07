import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { personalities, Personality } from '../data/personalities'

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mbti-card p-7 sm:p-9">
      <h3 className="text-lg font-black tracking-tight text-slate-950">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default function Result() {
  const navigate = useNavigate()
  const [personality, setPersonality] = useState<Personality | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const result = localStorage.getItem('mbti_result')
    const paid = localStorage.getItem('mbti_paid')

    if (!result) {
      navigate('/')
      return
    }

    if (!paid) {
      navigate('/payment')
      return
    }

    const p = personalities[result]
    if (p) setPersonality(p)
  }, [navigate])

  const restart = () => {
    localStorage.removeItem('mbti_answers')
    localStorage.removeItem('mbti_result')
    localStorage.removeItem('mbti_paid')
    navigate('/')
  }

  const shareText = useMemo(() => {
    if (!personality) return ''
    return `我的 MBTI 类型：${personality.type}（${personality.name}｜${personality.nickname}）`
  }, [personality])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // ignore
    }
  }

  if (!personality) return null

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <div className="mbti-card p-7 sm:p-9 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs font-semibold text-slate-600">
                你的类型
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                完整解析
              </div>
              <div className="flex items-end gap-4">
                <div className="text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
                  {personality.type}
                </div>
                <div className="pb-1">
                  <div className="text-xl font-black text-slate-950">{personality.name}</div>
                  <div className="text-sm text-slate-600">{personality.nickname}</div>
                </div>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600">
                {personality.description}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button className="mbti-button-primary" onClick={copy} disabled={!shareText}>
                {copied ? '已复制' : '复制分享文案'}
              </button>
              <button className="mbti-button-ghost" onClick={restart}>
                重新测试
              </button>
            </div>
          </div>
        </div>

        <div className="mbti-card p-7 sm:p-9">
          <div className="text-xs font-semibold text-slate-500">建议用法</div>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
            <div>
              1. 先读“优势/盲点”，对照你最近一次高压场景。
            </div>
            <div>
              2. 再看“职业建议”，把关键词写成你能接受的工作环境条件。
            </div>
            <div>3. 最后看“人际关系”，挑 1 条本周就能做的微动作。</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="优势">
          <div className="flex flex-wrap gap-2">
            {personality.strengths.map((s) => (
              <span
                key={s}
                className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>

        <Section title="需要注意">
          <div className="flex flex-wrap gap-2">
            {personality.weaknesses.map((w) => (
              <span
                key={w}
                className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700"
              >
                {w}
              </span>
            ))}
          </div>
        </Section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Section title="适合的职业">
            <div className="flex flex-wrap gap-2">
              {personality.careers.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700"
                >
                  {c}
                </span>
              ))}
            </div>
          </Section>
        </div>
        <Section title="同类型名人">
          <div className="flex flex-wrap gap-2">
            {personality.famousPeople.map((p) => (
              <span
                key={p}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-sm font-semibold text-slate-700"
              >
                {p}
              </span>
            ))}
          </div>
        </Section>
      </div>

      <div className="mt-4">
        <Section title="人际关系">
          <p className="text-sm leading-relaxed text-slate-600">{personality.relationships}</p>
        </Section>
      </div>
    </div>
  )
}


import { Link, useNavigate } from 'react-router-dom'

function Feature({
  title,
  desc,
}: {
  title: string
  desc: string
}) {
  return (
    <div className="mbti-card p-6">
      <div className="mb-2 text-sm font-semibold text-slate-900">{title}</div>
      <div className="text-sm leading-relaxed text-slate-600">{desc}</div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="mbti-pill">48 题</span>
            <span className="mbti-pill">约 10 分钟</span>
            <span className="mbti-pill">结果可复测对比</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            把“我是谁”说清楚
            <span className="block text-slate-600">从一次更像产品的 MBTI 测试开始。</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            不是鸡汤式的性格标签，而是一份结构化的偏好画像：你如何获取信息、如何做决定、如何补能量、如何安排生活。
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button className="mbti-button-primary" onClick={() => navigate('/test')}>
              开始测试
            </button>
            <Link className="mbti-button-ghost" to="/test">
              先看题目
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            完成测试后可选择付费查看完整解析报告（含优势盲点、职业建议、人际关系提示）。
          </p>
        </div>

        <div className="relative">
          <div className="mbti-card p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-slate-500">你的结果会长这样</div>
                <div className="mt-2 text-4xl font-black tracking-tight text-slate-950">INTJ</div>
                <div className="mt-1 text-sm text-slate-600">建筑师 · 独立的战略家</div>
              </div>
              <div className="rounded-2xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white">
                示例
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/60 p-4">
                <div className="text-xs font-semibold text-slate-500">优势</div>
                <div className="mt-2 space-y-1 text-sm text-slate-700">
                  <div>战略思维</div>
                  <div>独立自驱</div>
                  <div>长期规划</div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/60 p-4">
                <div className="text-xs font-semibold text-slate-500">注意点</div>
                <div className="mt-2 space-y-1 text-sm text-slate-700">
                  <div>情感表达</div>
                  <div>高标准压力</div>
                  <div>沟通摩擦</div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white/60 p-4">
              <div className="text-xs font-semibold text-slate-500">一句话总结</div>
              <div className="mt-2 text-sm leading-relaxed text-slate-700">
                “你擅长搭建体系和路线图，但也需要为关系和情绪留出带宽。”
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        <Feature title="不绕弯的题目" desc="每道题只问一个偏好，减少“看起来都对”的模糊感。" />
        <Feature title="维度可解释" desc="E/I、S/N、T/F、J/P 四个维度分别解释你在做什么选择。" />
        <Feature title="结果可行动" desc="给你可执行的建议：如何协作、如何沟通、如何选环境。" />
      </div>

      <section className="mt-14">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">什么是 MBTI？</h2>
          <a className="text-sm font-semibold text-slate-600 hover:text-slate-900" href="#faq">
            快速说明
          </a>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="mbti-card p-7">
            <div className="text-sm font-semibold text-slate-900">四个维度</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>外向 (E) vs 内向 (I)：能量来源</li>
              <li>感觉 (S) vs 直觉 (N)：信息获取</li>
              <li>思考 (T) vs 情感 (F)：决策方式</li>
              <li>判断 (J) vs 知觉 (P)：生活方式</li>
            </ul>
          </div>
          <div id="faq" className="mbti-card p-7">
            <div className="text-sm font-semibold text-slate-900">适合你用在哪？</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>了解自己在压力/冲突下的默认反应</li>
              <li>更高质量地描述“我喜欢怎样的协作方式”</li>
              <li>找到更舒适的工作与关系节奏</li>
              <li>把优势变成“可被看见的能力”</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-14 mbti-card p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xl font-black tracking-tight text-slate-950">准备好开始了吗？</div>
            <div className="mt-1 text-sm text-slate-600">先做一轮，拿到你的四字母类型。</div>
          </div>
          <div className="flex gap-3">
            <button className="mbti-button-primary" onClick={() => navigate('/test')}>
              立即开始
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

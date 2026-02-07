export interface Question {
  id: number
  text: string
  dimension: 'EI' | 'SN' | 'TF' | 'JP'
  direction: 'positive' | 'negative'
}

export const questions: Question[] = [
  // E/I 维度 - 外向/内向
  { id: 1, text: "在社交聚会中，我通常感到精力充沛", dimension: 'EI', direction: 'positive' },
  { id: 2, text: "我更喜欢一对一的深度交流而非群体活动", dimension: 'EI', direction: 'negative' },
  { id: 3, text: "我喜欢成为关注的焦点", dimension: 'EI', direction: 'positive' },
  { id: 4, text: "独处时我感到更加放松和充电", dimension: 'EI', direction: 'negative' },
  { id: 5, text: "我倾向于先说话再思考", dimension: 'EI', direction: 'positive' },
  { id: 6, text: "我需要时间独处来整理思绪", dimension: 'EI', direction: 'negative' },
  { id: 7, text: "我很容易与陌生人开始交谈", dimension: 'EI', direction: 'positive' },
  { id: 8, text: "我更喜欢书面沟通而非口头交流", dimension: 'EI', direction: 'negative' },
  { id: 9, text: "我喜欢参加各种社交活动", dimension: 'EI', direction: 'positive' },
  { id: 10, text: "我觉得太多社交活动会让我疲惫", dimension: 'EI', direction: 'negative' },
  { id: 11, text: "我喜欢在团队中工作", dimension: 'EI', direction: 'positive' },
  { id: 12, text: "我更喜欢独立完成任务", dimension: 'EI', direction: 'negative' },
  
  // S/N 维度 - 感觉/直觉
  { id: 13, text: "我更关注具体的事实和细节", dimension: 'SN', direction: 'positive' },
  { id: 14, text: "我喜欢思考抽象的概念和可能性", dimension: 'SN', direction: 'negative' },
  { id: 15, text: "我倾向于按照既定的方法做事", dimension: 'SN', direction: 'positive' },
  { id: 16, text: "我喜欢尝试新的方法和创意", dimension: 'SN', direction: 'negative' },
  { id: 17, text: "我更相信自己的实际经验", dimension: 'SN', direction: 'positive' },
  { id: 18, text: "我经常依靠直觉做决定", dimension: 'SN', direction: 'negative' },
  { id: 19, text: "我喜欢处理具体、实际的问题", dimension: 'SN', direction: 'positive' },
  { id: 20, text: "我喜欢探索理论和概念", dimension: 'SN', direction: 'negative' },
  { id: 21, text: "我注重当下发生的事情", dimension: 'SN', direction: 'positive' },
  { id: 22, text: "我经常想象未来的可能性", dimension: 'SN', direction: 'negative' },
  { id: 23, text: "我喜欢按部就班地完成任务", dimension: 'SN', direction: 'positive' },
  { id: 24, text: "我喜欢寻找事物之间的联系和模式", dimension: 'SN', direction: 'negative' },

  // T/F 维度 - 思考/情感
  { id: 25, text: "做决定时，我更看重逻辑和客观分析", dimension: 'TF', direction: 'positive' },
  { id: 26, text: "做决定时，我更考虑对他人的影响", dimension: 'TF', direction: 'negative' },
  { id: 27, text: "我认为诚实比圆滑更重要", dimension: 'TF', direction: 'positive' },
  { id: 28, text: "我很容易感受到他人的情绪", dimension: 'TF', direction: 'negative' },
  { id: 29, text: "我倾向于用头脑而非心灵做决定", dimension: 'TF', direction: 'positive' },
  { id: 30, text: "我重视和谐的人际关系", dimension: 'TF', direction: 'negative' },
  { id: 31, text: "我能够客观地分析问题，不受情感影响", dimension: 'TF', direction: 'positive' },
  { id: 32, text: "我经常考虑他人的感受", dimension: 'TF', direction: 'negative' },
  { id: 33, text: "我认为公平比同情更重要", dimension: 'TF', direction: 'positive' },
  { id: 34, text: "我喜欢帮助他人解决情感问题", dimension: 'TF', direction: 'negative' },
  { id: 35, text: "我更看重效率而非人情", dimension: 'TF', direction: 'positive' },
  { id: 36, text: "我很在意别人对我的看法", dimension: 'TF', direction: 'negative' },
  
  // J/P 维度 - 判断/知觉
  { id: 37, text: "我喜欢制定计划并按计划执行", dimension: 'JP', direction: 'positive' },
  { id: 38, text: "我喜欢保持灵活，随机应变", dimension: 'JP', direction: 'negative' },
  { id: 39, text: "我喜欢事情有明确的结论", dimension: 'JP', direction: 'positive' },
  { id: 40, text: "我喜欢保持选择的开放性", dimension: 'JP', direction: 'negative' },
  { id: 41, text: "我倾向于提前完成任务", dimension: 'JP', direction: 'positive' },
  { id: 42, text: "我经常在截止日期前才完成任务", dimension: 'JP', direction: 'negative' },
  { id: 43, text: "我喜欢有条理、有组织的生活", dimension: 'JP', direction: 'positive' },
  { id: 44, text: "我喜欢自发性和即兴发挥", dimension: 'JP', direction: 'negative' },
  { id: 45, text: "我做决定很果断", dimension: 'JP', direction: 'positive' },
  { id: 46, text: "我喜欢收集更多信息再做决定", dimension: 'JP', direction: 'negative' },
  { id: 47, text: "我喜欢遵循时间表和日程安排", dimension: 'JP', direction: 'positive' },
  { id: 48, text: "我觉得太多规则会限制我", dimension: 'JP', direction: 'negative' },
]

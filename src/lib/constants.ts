export const THEME_COLORS = [
  { name: "珊瑚红", value: "#f97316" },
  { name: "天空蓝", value: "#3b82f6" },
  { name: "薄荷绿", value: "#10b981" },
  { name: "琥珀黄", value: "#f59e0b" },
  { name: "薰衣草紫", value: "#8b5cf6" },
  { name: "玫瑰粉", value: "#ec4899" },
  { name: "森林绿", value: "#059669" },
  { name: "深空灰", value: "#6b7280" },
] as const;

export const PRESET_MARKERS = [
  "Check",
  "Star",
  "Flame",
  "Heart",
  "Zap",
  "Trophy",
  "Diamond",
  "Crown",
  "Flower2",
  "Award",
  "Sun",
  "Moon",
  "ThumbsUp",
  "Music",
  "Coffee",
  "Dumbbell",
  "BookOpen",
  "Palette",
] as const;

export type PresetMarker = (typeof PRESET_MARKERS)[number];

export const EMOJI_CATEGORIES = [
  {
    name: "运动",
    emojis: ["🏃", "🚴", "🏊", "⚽", "🏀", "🎾", "🧘", "💪", "🥊", "⛷️"],
  },
  {
    name: "饮食",
    emojis: ["☕", "🍵", "💧", "🥗", "🍎", "🥤", "🍳", "🥑", "🧃", "🍜"],
  },
  {
    name: "学习",
    emojis: ["📖", "✏️", "💻", "🎓", "📝", "🧠", "📚", "🔬", "🎯", "📐"],
  },
  {
    name: "生活",
    emojis: ["😴", "🧹", "🪥", "💊", "🌅", "🧘", "🎨", "🌱", "🐕", "📷"],
  },
  {
    name: "工作",
    emojis: ["💼", "📊", "📧", "🤝", "💡", "🔧", "📱", "🖥️", "✅", "🚀"],
  },
] as const;

export const PLACEHOLDER_NAMES = [
  "喝水记录",
  "健身日志",
  "读书打卡",
  "摸鱼计数器",
  "早起挑战",
  "冥想时刻",
  "咖啡日记",
  "今天跑了吗",
  "背单词",
  "不喝奶茶",
];

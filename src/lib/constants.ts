export const CATEGORIES = [
  { value: "自媒体", label: "自媒体", icon: "📝" },
  { value: "电商", label: "电商", icon: "🛒" },
  { value: "在线教育", label: "在线教育", icon: "📚" },
  { value: "自由职业", label: "自由职业", icon: "💼" },
  { value: "内容创作", label: "内容创作", icon: "✍️" },
  { value: "软件开发", label: "软件开发", icon: "💻" },
  { value: "设计创意", label: "设计创意", icon: "🎨" },
  { value: "咨询辅导", label: "咨询辅导", icon: "🗣️" },
  { value: "短视频", label: "短视频", icon: "📹" },
  { value: "直播带货", label: "直播带货", icon: "📡" },
  { value: "知识付费", label: "知识付费", icon: "🎓" },
  { value: "代购海淘", label: "代购海淘", icon: "🌍" },
  { value: "翻译写作", label: "翻译写作", icon: "🌐" },
  { value: "摄影摄像", label: "摄影摄像", icon: "📷" },
  { value: "其他", label: "其他", icon: "📦" },
] as const;

export type Category = (typeof CATEGORIES)[number]["value"];

export const DIFFICULTY_LEVELS = [
  { value: "入门", label: "入门", color: "bg-green-100 text-green-800 border-green-300" },
  { value: "中级", label: "中级", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  { value: "高级", label: "高级", color: "bg-red-100 text-red-800 border-red-300" },
] as const;

export type Difficulty = (typeof DIFFICULTY_LEVELS)[number]["value"];

export const SORT_OPTIONS = [
  { value: "newest", label: "最新发布" },
  { value: "popular", label: "最多浏览" },
  { value: "rating", label: "最高评分" },
  { value: "income", label: "最高收入" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export const STARTUP_COST_RANGES = [
  "0元（零成本）",
  "0-500元",
  "500-2000元",
  "2000-5000元",
  "5000-10000元",
  "10000元以上",
] as const;

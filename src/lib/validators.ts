import { z } from "zod";

const difficultyEnum = z.enum(["入门", "中级", "高级"]);

const categoryEnum = z.enum([
  "自媒体",
  "电商",
  "在线教育",
  "自由职业",
  "内容创作",
  "软件开发",
  "设计创意",
  "咨询辅导",
  "短视频",
  "直播带货",
  "知识付费",
  "代购海淘",
  "翻译写作",
  "摄影摄像",
  "其他",
]);

// Validates that a string is a valid JSON array
const jsonArrayString = z.string().refine(
  (val) => {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed);
    } catch {
      return false;
    }
  },
  { message: "必须是有效的 JSON 数组格式" }
);

// Validates that a string is a valid JSON array of {title, url} objects
const resourceLinksString = z.string().refine(
  (val) => {
    try {
      const parsed = JSON.parse(val);
      if (!Array.isArray(parsed)) return false;
      return parsed.every(
        (item: unknown) =>
          typeof item === "object" &&
          item !== null &&
          "title" in item &&
          "url" in item
      );
    } catch {
      return false;
    }
  },
  { message: "必须是有效的资源链接 JSON 数组" }
);

export const createSideHustleSchema = z
  .object({
    title: z.string().min(2, "标题至少2个字符").max(100, "标题最多100个字符"),
    category: categoryEnum,
    description: z
      .string()
      .min(10, "简短描述至少10个字符")
      .max(300, "简短描述最多300个字符"),
    fullDescription: z
      .string()
      .min(20, "详细介绍至少20个字符")
      .max(10000, "详细介绍最多10000个字符"),
    difficulty: difficultyEnum,
    timeInvestment: z.string().min(1, "请填写时间投入"),
    incomeMin: z.coerce.number().int().min(0, "最低收入不能小于0"),
    incomeMax: z.coerce.number().int().min(0, "最高收入不能小于0"),
    requiredSkills: jsonArrayString,
    toolsResources: jsonArrayString,
    startupCost: z.string().min(1, "请填写启动成本"),
    stepsToStart: jsonArrayString,
    pros: jsonArrayString,
    cons: jsonArrayString,
    tipsForSuccess: jsonArrayString,
    resourceLinks: resourceLinksString,
    coverImage: z.string().url("请输入有效的URL").nullable().optional(),
    submitterName: z.string().min(1, "请填写你的名字").max(50),
    submitterEmail: z.string().email("请输入有效的邮箱").nullable().optional(),
  })
  .refine((data) => data.incomeMax >= data.incomeMin, {
    message: "最高收入不能低于最低收入",
    path: ["incomeMax"],
  });

export const createCommentSchema = z.object({
  content: z.string().min(2, "评论至少2个字符").max(2000, "评论最多2000个字符"),
  authorName: z.string().min(1, "请填写你的名字").max(50),
  authorEmail: z.string().email("请输入有效的邮箱").nullable().optional(),
  parentId: z.string().nullable().optional(),
});

export const createRatingSchema = z.object({
  value: z.coerce.number().int().min(1, "最低1分").max(5, "最高5分"),
  authorName: z.string().min(1, "请填写你的名字").max(50),
  authorEmail: z.string().email("请输入有效的邮箱").nullable().optional(),
});

export const searchQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  search: z.string().optional(),
  category: z.string().optional(),
  difficulty: z.string().optional(),
  sortBy: z.enum(["newest", "popular", "rating", "income"]).default("newest"),
  minIncome: z.coerce.number().int().min(0).optional(),
  maxIncome: z.coerce.number().int().min(0).optional(),
});

export type CreateSideHustleInput = z.infer<typeof createSideHustleSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type CreateRatingInput = z.infer<typeof createRatingSchema>;
export type SearchQueryInput = z.infer<typeof searchQuerySchema>;

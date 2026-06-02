export interface SideHustleCardData {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  difficulty: string;
  timeInvestment: string;
  incomeMin: number;
  incomeMax: number;
  startupCost: string;
  requiredSkills: string;
  coverImage: string | null;
  averageRating: number;
  ratingCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: string;
}

export interface SideHustleDetail extends SideHustleCardData {
  fullDescription: string;
  toolsResources: string;
  stepsToStart: string;
  pros: string;
  cons: string;
  tipsForSuccess: string;
  resourceLinks: string;
  submitterName: string;
  updatedAt: string;
}

export interface CommentData {
  id: string;
  content: string;
  authorName: string;
  authorEmail: string | null;
  parentId: string | null;
  sideHustleId: string;
  createdAt: string;
  replies?: CommentData[];
}

export interface RatingSummary {
  averageRating: number;
  ratingCount: number;
  distribution: Record<number, number>;
  userRating: { value: number } | null;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SearchSuggestion {
  id: string;
  title: string;
  category: string;
  slug: string;
}

export interface SideHustleListResponse {
  data: SideHustleCardData[];
  pagination: PaginationMeta;
}

export interface ResourceLink {
  title: string;
  url: string;
}

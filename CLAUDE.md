# 副业宝典 - Side Hustle Showcase Platform

一个基于 Next.js 15 的副业展示分享平台，帮助用户发现和分享副业机会。

## 技术栈

- **框架**: Next.js 15 (App Router) + TypeScript
- **样式**: Tailwind CSS 4 + shadcn/ui
- **数据库**: SQLite + Prisma 5
- **验证**: Zod
- **表单**: react-hook-form
- **通知**: sonner (toast)

## 启动项目

```bash
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
src/app/           - Next.js App Router 页面和 API 路由
src/components/    - UI 组件（layout/home/sidehustle/search/rating/comment/share）
src/lib/           - 工具库（prisma, validators, constants, format, slug）
src/hooks/         - 自定义 Hooks（useDebounce）
src/types/         - TypeScript 类型定义
prisma/            - 数据库 Schema 和种子数据
```

## API 端点

- `GET/POST /api/sidehustles` - 副业列表和创建
- `GET/PATCH /api/sidehustles/[id]` - 副业详情和更新
- `GET/POST /api/sidehustles/[id]/comments` - 评论
- `GET/POST /api/sidehustles/[id]/ratings` - 评分
- `GET /api/search` - 搜索自动补全

## 核心功能

- 首页 Hero + 精选副业 + 分类浏览
- 搜索（防抖 300ms）+ 筛选（分类/难度/收入）+ 排序 + 分页
- 详情页 4 标签（概览/入门指南/评价/资源）
- 1-5 星评分 + 分布图 + email 去重
- 嵌套评论 + 回复
- 分享（复制链接/微博/微信）
- 提交新副业（5 段表单 + 动态列表）

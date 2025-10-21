# 我的个人博客

> 一个基于 Astro 5 + Vue 3 + Tailwind CSS v4 构建的现代化博客系统

🌐 **在线预览**: [https://zhang-jingdian-github-io.vercel.app](https://zhang-jingdian-github-io.vercel.app)

## ✨ 特性

### 核心功能

- 📝 **Markdown/MDX 支持** - 使用 Markdown 编写文章，支持 MDX 扩展
- 🔍 **智能搜索** - 基于 Fuse.js 的模糊搜索，支持标题、描述、标签搜索（快捷键 ⌘⇧K）
- 🏷️ **标签系统** - 文章分类和标签过滤，动态路由
- 📄 **分页功能** - 博客列表自动分页（每页 9 篇）
- 📖 **目录导航（TOC）** - 自动生成文章目录，支持平滑滚动和高亮
- 📊 **阅读进度条** - 实时显示文章阅读进度
- ⏱️ **阅读时间统计** - 智能计算中英文混合内容的阅读时间

### 设计与体验

- 🎨 **组件化设计** - 参考 shadcn-vue，使用 CVA 模式的可复用组件
- ♿ **无障碍支持** - 完善的键盘导航和 ARIA 标签，focus-visible 样式
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **极速加载** - Astro 静态生成，首屏加载极快
- 📈 **性能监控** - 集成 Vercel Speed Insights

### 开发体验

- � **TypeScript** - 完整的类型安全支持
- �🔍 **SEO 友好** - 完善的 meta 标签、sitemap 和 RSS
- 🚀 **自动部署** - 集成 Vercel，push 即部署
- 📦 **现代工具链** - pnpm + Vite + Tailwind CSS v4

## 🛠️ 技术栈

### 核心框架

- **框架**: [Astro 5.14.6](https://astro.build) - 现代化的静态站点生成器
- **UI 组件**: [Vue 3.5.22](https://vuejs.org) - 渐进式 JavaScript 框架
- **样式**: [Tailwind CSS v4](https://tailwindcss.com) - 原子化 CSS 框架
- **类型**: TypeScript - 完整的类型安全

### 组件与工具

- **组件模式**: [shadcn-vue](https://www.shadcn-vue.com/) 设计理念
- **样式管理**: [Class Variance Authority](https://cva.style/docs) - CVA 模式
- **工具函数**: clsx + tailwind-merge - 类名合并
- **图标**: [Lucide Vue](https://lucide.dev) - 美观的开源图标库
- **搜索**: [Fuse.js](https://fusejs.io/) - 轻量级模糊搜索引擎

### 部署与监控

- **部署**: [Vercel](https://vercel.com) - 边缘网络部署平台
- **性能监控**: Vercel Speed Insights - 真实用户性能监控
- **包管理**: pnpm - 快速、节省磁盘空间的包管理器

## 📦 项目结构

```
blog/
├── public/              # 静态资源
│   ├── og-image.svg    # OG 图片
│   └── favicon.svg     # 网站图标
├── src/
│   ├── components/     # Vue/Astro 组件
│   │   ├── ui/         # shadcn-vue 组件
│   │   │   └── button/ # Button 组件
│   │   ├── Tag/        # 标签组件（CVA）
│   │   ├── Pagination/ # 分页组件（CVA）
│   │   ├── BaseHeader/ # 导航栏
│   │   ├── BaseFooter/ # 页脚
│   │   ├── BlogCard/   # 博客卡片
│   │   ├── SearchBar/  # 搜索框
│   │   ├── TableOfContents/ # 目录组件
│   │   ├── ReadingProgress/ # 阅读进度条
│   │   └── FormattedDate/   # 格式化日期
│   ├── content/        # 内容集合
│   │   └── blog/       # 博客文章（Markdown）
│   ├── layouts/        # 页面布局
│   │   ├── BaseLayout.astro  # 基础布局
│   │   └── BlogLayout.astro  # 博客布局
│   ├── pages/          # 路由页面
│   │   ├── index.astro       # 首页
│   │   ├── about.astro       # 关于页面
│   │   ├── rss.xml.ts        # RSS 订阅
│   │   └── blog/             # 博客相关页面
│   │       ├── [...page].astro   # 博客列表（分页）
│   │       ├── [slug].astro      # 文章详情
│   │       └── tag/[tag].astro   # 标签页
│   ├── lib/            # 工具函数
│   │   ├── readingTime.ts    # 阅读时间计算
│   │   └── utils.ts          # 通用工具（cn 函数）
│   ├── styles/         # 全局样式
│   └── config.ts       # 站点配置
├── astro.config.ts     # Astro 配置
├── package.json
├── tsconfig.json
└── components.json     # shadcn-vue 配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8 (推荐)

### 安装

```bash
# 克隆仓库
git clone https://github.com/Zhang-Jingdian/Zhang-Jingdian.github.io.git
cd Zhang-Jingdian.github.io

# 安装依赖
pnpm install
```

### 开发

```bash
# 启动开发服务器
pnpm run dev

# 访问 http://localhost:4321
```

### 构建

```bash
# 构建生产版本
pnpm run build

# 预览生产构建
pnpm run preview
```

## ✍️ 写文章

在 `src/content/blog/` 目录下创建新的 Markdown 文件：

```markdown
---
title: '你的文章标题'
description: '文章描述'
publishDate: 2025-01-20
tags: ['标签1', '标签2']
heroImage: './images/cover.jpg' # 可选
---

这里是文章内容...
```

## ⚙️ 配置

在 `src/config.ts` 中修改站点配置：

```typescript
export const SITE_CONFIG = {
  title: '你的博客名称',
  description: '你的博客描述',
  author: '你的名字',
  social: {
    github: 'https://github.com/yourusername',
    email: 'your.email@example.com',
  },
  // ...
}
```

## 🎨 组件设计

本项目参考 [shadcn-vue](https://www.shadcn-vue.com/) 的设计理念，使用 **Class Variance Authority (CVA)** 模式构建组件：

### 核心组件

- **Tag** - 标签组件，支持 4 种变体（default/outline/ghost/counter）
- **PaginationButton** - 分页按钮，支持 4 种变体（default/active/disabled/ghost）
- **Button** - 通用按钮组件（来自 shadcn-vue）
- **HeaderLink** - 导航链接，自动高亮当前页

### 设计原则

1. **类型安全** - 完整的 TypeScript 类型支持
2. **可组合性** - 使用 CVA 管理样式变体
3. **无障碍性** - 完善的 focus-visible 和 ARIA 支持
4. **一致性** - 统一的设计令牌和交互模式

## 🔍 搜索功能

使用 `Ctrl/Cmd + Shift + K` 快捷键打开搜索框：

- 🎯 支持标题、描述、标签的模糊搜索
- ⚡ 实时搜索结果展示
- 📱 响应式设计，移动端友好
- ♿ 支持键盘导航（ESC 关闭）

## 📝 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 重构
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建/工具相关

## 📄 License

MIT License © 2025 Zhang-Jingdian

## 🙏 致谢

感谢以下开源项目和资源：

### 核心框架
- [Astro](https://astro.build) - 静态站点生成器
- [Vue.js](https://vuejs.org) - JavaScript 框架
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架

### 组件与工具
- [shadcn-vue](https://www.shadcn-vue.com/) - 组件设计灵感
- [Class Variance Authority](https://cva.style/docs) - 样式管理
- [Fuse.js](https://fusejs.io/) - 搜索引擎
- [Lucide](https://lucide.dev) - 图标库

### 部署与监控
- [Vercel](https://vercel.com) - 部署平台
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights) - 性能监控

---

⭐ 如果这个项目对你有帮助，欢迎 Star！

📧 有问题或建议？欢迎提 [Issue](https://github.com/Zhang-Jingdian/Zhang-Jingdian.github.io/issues)
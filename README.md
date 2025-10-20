# 我的个人博客

> 一个基于 Astro 5 + Vue 3 + Tailwind CSS v4 构建的现代化博客系统

🌐 **在线预览**: [https://zhang-jingdian-github-5drsehnc3-zjds-projects-6160e985.vercel.app](https://zhang-jingdian-github-5drsehnc3-zjds-projects-6160e985.vercel.app)

## ✨ 特性

- 📝 **Markdown/MDX 支持** - 使用 Markdown 编写文章，支持 MDX 扩展
- 🏷️ **标签系统** - 文章分类和标签过滤
- 📖 **目录导航（TOC）** - 自动生成文章目录，支持平滑滚动和高亮
- 📊 **阅读进度条** - 实时显示文章阅读进度
- ⏱️ **阅读时间统计** - 智能计算中英文混合内容的阅读时间
- 🎨 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **性能优化** - 使用 Astro 的静态生成，加载速度极快
- 🔍 **SEO 友好** - 完善的 meta 标签和 sitemap
- 🚀 **自动部署** - 集成 Vercel，push 即部署

## 🛠️ 技术栈

- **框架**: [Astro 5.14.6](https://astro.build) - 现代化的静态站点生成器
- **UI 组件**: [Vue 3.5.22](https://vuejs.org) - 渐进式 JavaScript 框架
- **样式**: [Tailwind CSS v4](https://tailwindcss.com) - 原子化 CSS 框架
- **动画**: [tw-animate-css](https://github.com/bent10/tailwindcss-plugins) - Tailwind 动画扩展
- **图标**: [Lucide Vue](https://lucide.dev) - 美观的开源图标库
- **部署**: [Vercel](https://vercel.com) - 边缘网络部署平台

## 📦 项目结构

```
blog/
├── public/              # 静态资源
│   ├── og-image.svg    # OG 图片
│   └── favicon.svg     # 网站图标
├── src/
│   ├── components/     # Vue/Astro 组件
│   │   ├── BaseHeader/ # 导航栏
│   │   ├── BaseFooter/ # 页脚
│   │   ├── BlogCard/   # 博客卡片
│   │   ├── TableOfContents/ # 目录组件
│   │   └── ReadingProgress/ # 阅读进度条
│   ├── content/        # 内容集合
│   │   └── blog/       # 博客文章（Markdown）
│   ├── layouts/        # 页面布局
│   │   ├── BaseLayout.astro  # 基础布局
│   │   └── BlogLayout.astro  # 博客布局
│   ├── pages/          # 路由页面
│   │   ├── index.astro       # 首页
│   │   ├── blog/             # 博客相关页面
│   │   │   ├── index.astro   # 博客列表
│   │   │   ├── [slug].astro  # 文章详情
│   │   │   └── tag/[tag].astro # 标签页
│   │   └── about.astro       # 关于页面
│   ├── lib/            # 工具函数
│   │   ├── readingTime.ts    # 阅读时间计算
│   │   └── utils.ts          # 通用工具
│   ├── styles/         # 全局样式
│   └── config.ts       # 站点配置
├── astro.config.mjs    # Astro 配置
├── package.json
└── tsconfig.json
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

感谢以下开源项目：

- [Astro](https://astro.build)
- [Vue.js](https://vuejs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com)

---

⭐ 如果这个项目对你有帮助，欢迎 Star！
---
title: "欢迎来到我的 Astro 博客"
description: "用 Astro 和内容集合构建的第一篇示例文章。"
publishDate: 2025-10-19
updatedDate: 2025-10-19
tags:
  - Astro
  - 博客
  - 前端
---

> 这一篇文章演示了如何使用 Astro 的 `content collections` 与动态路由在项目里渲染一篇博客。

## 为什么选择 Astro

- **性能好**：默认输出静态资源，部署简单。
- **渐进增强**：按需引入 Vue/React 等组件，保持灵活性。
- **开发体验佳**：文件即路由，支持 Markdown/MDX，无需额外配置即可开始写作。

## 文章结构

```astro
src/
  content/
    blog/
      welcome-to-my-blog.md   ← 我们现在这篇文章
  pages/
    blog/
      [slug].astro            ← 动态路由模板
```

## 下一步

1. 修改 frontmatter，填入你自己的标题与标签。
2. 添加更多 Markdown 内容，例如图片、代码块或提示框。
3. 在命令行运行 `pnpm dev`，然后访问 `http://localhost:4321/blog/welcome-to-my-blog` 预览效果。

祝你写博文愉快！

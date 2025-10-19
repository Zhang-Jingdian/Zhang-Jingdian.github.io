---
title: "Tailwind CSS v4 使用指南"
description: "探索 Tailwind CSS v4 的新特性和最佳实践"
publishDate: 2025-10-17
tags:
  - CSS
  - Tailwind
  - 前端
  - 样式
---

Tailwind CSS v4 带来了重大的架构改变，本文将帮助你快速上手新版本。

## 主要变化

### 1. 原生 CSS 引擎

Tailwind v4 使用了全新的 CSS 引擎，完全基于现代 CSS 特性：

```css
@import "tailwindcss";
```

不再需要 PostCSS 配置！

### 2. CSS 优先的配置

配置现在直接在 CSS 文件中完成：

```css
@theme {
  --color-primary: #3b82f6;
  --font-sans: 'Inter', sans-serif;
}
```

### 3. 自定义变体

使用 `@custom-variant` 定义自定义变体：

```css
@custom-variant dark (&:is(.dark *));
```

## 重要提示：@apply 的变化

⚠️ **关键变化**：Tailwind v4 中，`@apply` 指令不能在组件的 scoped 样式中使用。

### ❌ 错误做法

```vue
<style scoped>
.button {
  @apply px-4 py-2 bg-blue-500;
}
</style>
```

### ✅ 正确做法

**方案 1：使用内联 class**

```vue
<button class="px-4 py-2 bg-blue-500">
  点击我
</button>
```

**方案 2：在全局 CSS 中使用 @layer**

```css
/* global.css */
@layer components {
  .button {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: rgb(59 130 246);
  }
}
```

**方案 3：使用动态 class 绑定**

```vue
<script setup>
const buttonClass = 'px-4 py-2 bg-blue-500';
</script>

<template>
  <button :class="buttonClass">点击我</button>
</template>
```

## 性能优化

Tailwind v4 的构建速度相比 v3：

- 开发模式快 **10倍**
- 生产构建快 **5倍**
- 更小的最终 CSS 文件

## 迁移建议

1. **移除 `tailwind.config.js`**：配置迁移到 CSS
2. **更新 @apply 用法**：改用内联 class 或全局样式
3. **测试自定义主题**：验证颜色和间距变量
4. **检查插件兼容性**：某些 v3 插件可能需要更新

## 实用技巧

### 使用 CSS 变量

```css
@theme {
  --color-brand: oklch(0.5 0.2 250);
  --spacing-huge: 10rem;
}
```

在代码中使用：

```html
<div class="text-brand p-huge">
  自定义样式
</div>
```

### 响应式设计

```html
<div class="text-sm md:text-base lg:text-lg">
  响应式文本
</div>
```

### 暗色模式

```html
<div class="bg-white dark:bg-neutral-900">
  自适应主题
</div>
```

## 总结

Tailwind v4 是一次革命性的更新，虽然需要调整一些使用习惯，但带来的性能提升和开发体验改进是值得的。

记住核心原则：**尽量使用内联 utility classes，避免在组件作用域中使用 @apply**。

---

**参考链接：**
- [Tailwind CSS v4 文档](https://tailwindcss.com)
- [迁移指南](https://tailwindcss.com/docs/upgrade-guide)

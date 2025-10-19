---
title: "在 Astro 中集成 Vue 3"
description: "学习如何在 Astro 项目中优雅地使用 Vue 3 组件"
publishDate: 2025-10-16
tags:
  - Vue
  - Astro
  - 前端
  - 组件化
---

Astro 的一大优势是可以无缝集成各种前端框架。本文将介绍如何在 Astro 中使用 Vue 3。

## 为什么选择 Astro + Vue？

这个组合提供了最佳的两个世界：

- **Astro**：静态生成、零 JS 默认、优秀的性能
- **Vue**：响应式数据、丰富的生态、熟悉的开发体验

## 安装配置

### 1. 添加 Vue 集成

```bash
pnpm astro add vue
```

### 2. 配置文件

会自动更新 `astro.config.mjs`：

```javascript
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  integrations: [vue()]
});
```

## 使用 Vue 组件

### 创建 Vue 组件

```vue
<!-- src/components/Counter.vue -->
<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const increment = () => count.value++;
</script>

<template>
  <button @click="increment" class="btn">
    点击次数: {{ count }}
  </button>
</template>

<style scoped>
.btn {
  padding: 0.5rem 1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
```

### 在 Astro 页面中使用

```astro
---
import Counter from '@/components/Counter.vue';
---

<div>
  <h1>我的页面</h1>
  <Counter client:load />
</div>
```

## Client Directives

Astro 提供多种客户端指令来控制组件的加载时机：

### `client:load`

页面加载后立即加载组件：

```astro
<Header client:load />
```

**适用场景**：导航栏、关键交互组件

### `client:idle`

浏览器空闲时加载：

```astro
<ChatWidget client:idle />
```

**适用场景**：聊天窗口、推荐组件

### `client:visible`

组件进入视口时加载：

```astro
<Footer client:visible />
```

**适用场景**：页脚、评论区

### `client:media`

媒体查询匹配时加载：

```astro
<Sidebar client:media="(min-width: 768px)" />
```

**适用场景**：响应式组件

### `client:only`

仅在客户端渲染：

```astro
<BrowserOnlyWidget client:only="vue" />
```

**适用场景**：依赖浏览器 API 的组件

## 最佳实践

### 1. 合理选择渲染策略

```astro
<!-- ✅ 静态内容用 Astro -->
<header>
  <h1>我的网站</h1>
</header>

<!-- ✅ 交互组件用 Vue -->
<SearchBar client:load />

<!-- ✅ 非关键组件延迟加载 -->
<Newsletter client:visible />
```

### 2. 共享状态管理

使用 Vue 的 Composition API：

```typescript
// src/composables/useCounter.ts
import { ref } from 'vue';

export function useCounter() {
  const count = ref(0);
  const increment = () => count.value++;
  return { count, increment };
}
```

### 3. TypeScript 支持

```vue
<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
});
</script>
```

## 性能优化技巧

### 1. 按需加载

```astro
<!-- 只在需要时加载 -->
{showModal && <Modal client:load />}
```

### 2. 避免不必要的 hydration

```astro
<!-- ❌ 静态内容不需要 client 指令 -->
<StaticCard client:load />

<!-- ✅ 完全静态 -->
<StaticCard />
```

### 3. 使用 Islands Architecture

将交互性限制在小的"岛屿"中：

```astro
<article>
  <!-- 静态内容 -->
  <h1>文章标题</h1>
  <p>文章内容...</p>
  
  <!-- 交互岛屿 -->
  <LikeButton client:visible />
  <CommentSection client:idle />
</article>
```

## 常见问题

### Q: Vue 组件中的样式会被提取吗？

A: 是的，Astro 会提取和优化 Vue 组件的样式。

### Q: 可以使用 Vue Router 吗？

A: 不推荐。Astro 有自己的文件路由系统，更适合静态站点。

### Q: Pinia 状态管理可以用吗？

A: 可以，但要注意跨组件状态共享的限制。

## 总结

Astro + Vue 是构建现代 Web 应用的强大组合。记住：

- **默认静态**：能用 Astro 就用 Astro
- **按需交互**：只在需要的地方使用 Vue
- **性能优先**：合理使用 client 指令

这样你就能构建出既快又交互丰富的网站！

/**
 * 站点配置文件
 * 集中管理站点的基本信息和常量
 */

// ==================== 站点基本配置 ====================
export const SITE_CONFIG = {
  // 站点基本信息
  title: '我的博客',
  description: '一个基于 Astro 构建的现代博客',
  author: 'Your Name',
  
  // SEO 默认值
  defaultImage: '/og-image.svg',
  
  // 导航菜单
  nav: [
    { name: '首页', href: '/' },
    { name: '博客', href: '/blog' },
    { name: '关于', href: '/about' },
  ],
  
  // 社交媒体链接
  social: {
    github: 'https://github.com/yourusername',
    twitter: 'https://twitter.com/yourusername',
    email: 'your.email@example.com',
  },
  
  // 版权年份起始
  copyrightYear: 2025,
} as const;

// ==================== 博客配置 ====================
export const BLOG_CONFIG = {
  // 每页文章数量
  postsPerPage: 10,
  
  // 日期格式
  dateFormat: {
    locale: 'zh-CN',
    options: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions,
  },
} as const;


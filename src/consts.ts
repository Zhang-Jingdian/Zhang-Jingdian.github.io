// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "我的个人博客";
export const SITE_TAGLINE = "现代化技术栈";
export const SITE_DESCRIPTION =
    "使用 Astro + Vue3 + TailwindCSS v4 + Inspira 组件库的个人博客";
export const SITE_LANG = "zh-CN";

export const AUTHOR_NAME = "Jingdian Zhang";

export const SOCIAL_LINKS = [
    {
        name: "GitHub",
        url: "https://github.com/Zhang-Jingdian",
        srText: "前往我的 GitHub 主页",
        icon: "mdi:github",
    },
];

export const COPYRIGHT_TEXT = `All rights reserved.`;

// Hero Section
export const HERO_TITLE = "我的";
export const HERO_TITLE_SPAN = "博客世界";
export const HERO_SUBTITLE =
    "分享技术见解、生活感悟与创作灵感 ✨<br />基于现代化技术栈构建的个人博客空间";
export const HERO_CTA_PRIMARY_TEXT = "📖 开始阅读";
export const HERO_CTA_SECONDARY_TEXT = "👋 关于我";

// Tech Stack Section
export const TECH_STACK_TITLE = "🛠️ 技术栈";
export const TECH_STACK_ITEMS = [
    { name: "Astro", icon: "🚀" },
    { name: "Vue 3", icon: "💚" },
    { name: "TypeScript", icon: "📘" },
    { name: "TailwindCSS v4", icon: "🎨" },
    { name: "Inspira UI", icon: "✨" },
    { name: "shadcn-vue", icon: "🔧" },
];

// Blog Preview Section
export const BLOG_PREVIEW_TITLE = "📝 最新文章";
export const READ_MORE_TEXT = "阅读更多 →";
export const VIEW_ALL_POSTS_TEXT = "📚 查看所有文章";

// Paths
export const PATH_HOME = "/";
export const PATH_BLOG = "/blog";
export const PATH_PROJECT = "/project";

// Dock
export const DOCK_LINKS = [
    {
        to: PATH_HOME,
        label: "首页",
        icon: "fluent-emoji:nerd-face",
    },
    {
        to: PATH_BLOG,
        label: "博客",
        icon: "fluent-emoji:writing-hand-medium-light",
    },
    {
        to: PATH_PROJECT,
        label: "project",
        icon: "fluent-emoji:rocket",
    },
];

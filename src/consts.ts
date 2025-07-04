// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "我的个人博客";
export const SITE_TAGLINE = "现代化技术栈";
export const SITE_DESCRIPTION =
    "使用 Astro + Vue3 + TailwindCSS v4 + Inspira 组件库的个人博客";
export const SITE_LANG = "zh-CN";

export const AUTHOR_NAME = "Zhang Jingdian";

export const SOCIAL_LINKS = [
    {
        name: "Mastodon",
        url: "https://m.webtoo.ls/@astro",
        srText: "Follow Astro on Mastodon",
        icon: "mdi:mastodon",
    },
    {
        name: "Twitter",
        url: "https://twitter.com/astrodotbuild",
        srText: "Follow Astro on Twitter",
        icon: "mdi:twitter",
    },
    {
        name: "GitHub",
        url: "https://github.com/withastro/astro",
        srText: "Go to Astro's GitHub repo",
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
export const FEATURED_POSTS = [
    {
        id: "using-mdx",
        title: "Using MDX",
        excerpt:
            "MDX是一种特殊的Markdown格式，支持嵌入式JavaScript和JSX语法。这解锁了将JavaScript和UI组件混合到Markdown内容中的能力...",
        date: "2024-06-01",
        readTime: "5 分钟阅读",
        slug: "using-mdx",
    },
    {
        id: "markdown-style-guide",
        title: "Markdown Style Guide",
        excerpt:
            "这里有一些基本的Markdown语法示例，可以在Astro中编写Markdown内容时使用。包括标题、段落、图片、代码块等各种元素的使用方法...",
        date: "2024-06-19",
        readTime: "8 分钟阅读",
        slug: "markdown-style-guide",
    },
    {
        id: "third-post",
        title: "Third post",
        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        date: "2022-07-22",
        readTime: "6 分钟阅读",
        slug: "third-post",
    },
];
export const READ_MORE_TEXT = "阅读更多 →";
export const VIEW_ALL_POSTS_TEXT = "📚 查看所有文章";

// Paths
export const PATH_ABOUT = "/about";
export const PATH_BLOG = "/blog";

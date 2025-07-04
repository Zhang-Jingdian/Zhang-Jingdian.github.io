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

// Paths
export const PATH_HOME = "/";
export const PATH_BLOG = "/blog";
export const PATH_ABOUT = "/about";

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
        to: PATH_ABOUT,
        label: "关于",
        icon: "fluent-emoji:rocket",
    },
];

// BlogPost Layout
export const LAST_UPDATED_ON_TEXT = "最后更新于";

// Theme Toggle
export const THEME_ICON_LIGHT = 'fluent-emoji:sun';
export const THEME_ICON_DARK = 'fluent-emoji:full-moon';

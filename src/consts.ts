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

export const SKILLS_ROW_1 = [
    { name: 'HTML', icon: 'skill-icons:html' },
    { name: 'CSS', icon: 'skill-icons:css' },
    { name: 'Tailwind', icon: 'skill-icons:tailwindcss-dark' },
    { name: 'JavaScript', icon: 'skill-icons:javascript' },
    { name: 'TypeScript', icon: 'skill-icons:typescript' },
    { name: 'Vue', icon: 'skill-icons:vuejs-dark' },
    { name: 'Astro', icon: 'skill-icons:astro' },
    { name: 'Node', icon: 'skill-icons:nodejs-dark' },
    { name: 'Vite', icon: 'skill-icons:vite-dark' },
    { name: 'pnpm', icon: 'skill-icons:pnpm-dark' },
];

export const SKILLS_ROW_2 = [
    { name: 'Spring', icon: 'skill-icons:spring-dark' },
    { name: 'Java', icon: 'skill-icons:java-dark' },
    { name: 'Python', icon: 'skill-icons:python-dark' },
    { name: 'C++', icon: 'skill-icons:cpp' },
    { name: 'MySQL', icon: 'skill-icons:mysql-dark' },
    { name: 'Redis', icon: 'skill-icons:redis-dark' },
    { name: 'Docker', icon: 'skill-icons:docker' },
    { name: 'Git', icon: 'skill-icons:git' },
];

export const SKILLS_ROW_3 = [
    { name: 'vscode', icon: 'skill-icons:vscode-dark' },
    { name: 'idea', icon: 'skill-icons:idea-dark' },
    { name: 'Linux', icon: 'skill-icons:linux-dark' },
    { name: 'Windows', icon: 'skill-icons:windows-dark' },
    { name: 'macOS', icon: 'skill-icons:apple-dark' },
    { name: 'figma', icon: 'skill-icons:figma-dark' },
    { name: 'github', icon: 'skill-icons:github-dark' },
    { name: 'vercel', icon: 'skill-icons:vercel-dark' },
];

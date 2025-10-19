import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  // 使用 glob loader 加载 Markdown 和 MDX 文件
  loader: glob({ 
    base: './src/content/blog', 
    pattern: '**/*.{md,mdx}' 
  }),
  
  // 使用 schema 函数形式，支持 image() 辅助函数
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    heroImage: image().optional()  // 使用 image() 替代 z.string()
  })
});

export const collections = { blog };

# Monorepo 工程化指南

这份指南的核心是利用 **pnpm** 来构建一个与具体前端框架无关的、高效的多包（Multi-package）代码仓库。

## 1. Monorepo 核心理念与优势

### 理念

在单一的代码仓库（Repository）中管理多个独立但又相互关联的项目或代码包（Package）。

### 核心优势

- **代码复用与共享**：轻松创建共享包（如 `shared-utils`、`shared-ui`），无需发布到 npm 即可被仓库内任何应用消费。
    
- **统一依赖管理**：所有依赖由根目录的 pnpm 统一管理，有效避免版本冲突，并通过 pnpm 的硬链接和符号链接特性极大节省磁盘空间。
    
- **原子化提交**：涉及多个包的修改可以在一次 Git 提交中完成，保持代码变更的同步性和一致性，便于追溯。
    
- **简化构建流程**：可以通过一条命令，按正确的依赖顺序构建整个项目下的所有或部分包。
    

---

## 2. 技术选型

|类别|推荐工具|作用|
|---|---|---|
|包管理器|**pnpm**|核心工具，因其对 workspace（工作区）的原生、高效支持而被选中。|
|构建工具|**Vite 或 tsc**|用于将 TypeScript/JavaScript 包构建成可发布的产物。|
|部署方案|**Docker**|将构建后的静态应用容器化并提供服务。|

---

## 3. Monorepo 项目初始化与结构

本节将指导你设置一个基本的 Monorepo 项目结构。

### 1. 项目结构

```
my-monorepo/
├── apps/                 # 存放最终的应用（例如：web应用、桌面应用）
│   ├── app-a/
│   │   ├── package.json
│   │   └── ...
│   └── app-b/
│       ├── package.json
│       └── ...
├── packages/             # 存放可复用的共享库、组件库、工具函数等
│   ├── shared-utils/
│   │   ├── package.json
│   │   └── ...
│   └── shared-types/
│       ├── package.json
│       └── ...
├── pnpm-workspace.yaml   # pnpm 工作区配置文件
├── package.json          # 根目录 package.json，管理公共依赖和脚本
├── tsconfig.json         # 根目录 TypeScript 配置（可选，但推荐）
└── .gitignore            # Git 忽略文件
```

### 2. 初始化步骤

Bash

```shell
# 创建项目根目录
mkdir my-monorepo && cd my-monorepo

# 初始化 Git
git init

# 创建 apps 和 packages 目录
mkdir -p apps/app-a apps/app-b
mkdir -p packages/shared-utils packages/shared-types
```

### 3. 配置 `pnpm-workspace.yaml`

在项目根目录创建 `pnpm-workspace.yaml` 文件，pnpm 会根据此文件识别工作区内的所有包。

YAML

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'    # 匹配 apps 目录下的所有子目录作为包
  - 'packages/*' # 匹配 packages 目录下的所有子目录作为包
```

### 4. 配置根 `package.json`

根 `package.json` 主要用于定义整个项目的开发依赖和公共脚本。

JSON

```json
{
  "name": "my-monorepo",
  "private": true,  # 私有，防止被意外发布到 npm
  "scripts": {
    "build": "pnpm --recursive build",          # 构建所有包
    "build:app-a": "pnpm --filter @monorepo/app-a build", # 构建指定应用
    "dev:app-a": "pnpm --filter @monorepo/app-a dev"     # 启动指定应用开发服务
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

### 5. 配置子包 `package.json`

每个子目录（应用或包）都需要自己的 `package.json`。**包名（`name`）至关重要，它是内部引用的唯一标识。** 建议使用 `@monorepo` 这样的命名空间前缀。

#### `packages/shared-utils/package.json`

一个可构建的共享库示例：

JSON

```json
{
  "name": "@monorepo/shared-utils",
  "version": "1.0.0",
  "main": "dist/index.js",     # 构建产物入口
  "types": "dist/index.d.ts",  # 类型定义文件
  "scripts": {
    "build": "vite build"      # 假设使用 vite 构建这个库
  }
}
```

#### `apps/app-a/package.json`

一个应用示例：

JSON

```json
{
  "name": "@monorepo/app-a",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite dev",         # 启动开发服务
    "build": "vite build"      # 构建应用
  }
}
```

### 6. 根 `tsconfig.json` (可选但推荐)

在根目录配置 `tsconfig.json` 可以统一管理所有 TypeScript 包的编译选项，并利用 Project References 优化构建。

JSON

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@monorepo/*": ["./packages/*/src"] # 配置路径别名，方便导入
    }
  },
  "references": [ # 声明项目引用，pnpm 可以利用它们优化增量构建
    {"path": "./packages/shared-utils"},
    {"path": "./packages/shared-types"},
    {"path": "./apps/app-a"},
    {"path": "./apps/app-b"}
  ]
}
```

---

## 4. Monorepo 依赖管理

pnpm 让跨包依赖管理变得异常简单。

### 1. 添加外部依赖

- **为特定包添加依赖**：使用 `--filter` 标志。
    
   ```shell
    # 为 app-a 添加 dayjs
    pnpm add dayjs --filter @monorepo/app-a
    ```
    
- **为所有包添加公共开发依赖**：使用 `-w` 标志，安装在根目录。
    
    ```shell
    # 在根目录添加 typescript 作为开发依赖
    pnpm add -D -w typescript
    ```
    

### 2. 添加内部（本地）依赖

这是 Monorepo 的核心魅力。通过 `workspace:` 协议，一个包可以引用工作区内的另一个包。

假设 `app-a` 需要使用 `shared-utils` 中的工具函数：

```shell
# 在 app-a 目录中，添加对 @monorepo/shared-utils 的依赖
pnpm add @monorepo/shared-utils --filter @monorepo/app-a
```

执行后，`apps/app-a/package.json` 的 `dependencies` 会自动更新：

JSON

```json
"dependencies": {
  "@monorepo/shared-utils": "workspace:^1.0.0"
}
```

pnpm 会自动创建符号链接（symlink），无需任何额外配置，你就可以在 `app-a` 的代码中直接 `import` 来自 `@monorepo/shared-utils` 的模块。

---

## 5. Monorepo 核心代码示例

### 1. 共享库代码 (`packages/shared-utils/src/index.ts`)

TypeScript

```ts
// packages/shared-utils/src/index.ts
export function greet(name: string): string {
  return `Hello, ${name}! Welcome to the Monorepo.`;
}

export function add(a: number, b: number): number {
  return a + b;
}
```

### 2. 共享库构建配置 (`packages/shared-utils/vite.config.ts`)

对于一个共享库（如 `shared-utils`），构建目标是生成 JS 和类型声明文件。

TypeScript

```ts
// packages/shared-utils/vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'; // 用于生成 .d.ts 文件

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SharedUtils',
      fileName: 'index',
      formats: ['es', 'cjs'] // 构建为 ES Module 和 CommonJS 格式
    },
    rollupOptions: {
      external: [], // 如果有外部依赖（如lodash），在此处声明
    }
  },
  plugins: [dts()], // 自动生成类型声明
});
```

### 3. 应用代码 (`apps/app-a/src/main.ts`)

TypeScript

```ts
// apps/app-a/src/main.ts
import { greet, add } from '@monorepo/shared-utils'; // 直接从共享库导入

function runApp() {
  const message = greet('Monorepo User');
  console.log(message); // Output: Hello, Monorepo User! Welcome to the Monorepo.

  const sum = add(5, 3);
  console.log(`The sum is: ${sum}`); // Output: The sum is: 8

  const appDiv = document.getElementById('app');
  if (appDiv) {
    appDiv.innerHTML = `<h1>${message}</h1><p>Result of 5 + 3 is: ${sum}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', runApp);
```

### 4. 应用构建配置 (`apps/app-a/vite.config.ts`)

TypeScript

```ts
// apps/app-a/vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  // 可以根据应用类型配置，例如：
  // plugins: [react()], // 如果是 React 应用
  // plugins: [vue()],   // 如果是 Vue 应用
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
```

---

## 6. Monorepo 跨包脚本执行

pnpm 提供了强大的 `--filter` 选项来执行特定包或一组包内的 scripts。

- **执行单个包的脚本**：
    
    ```shell
    # 只启动 app-a 的开发服务
    pnpm --filter @monorepo/app-a dev
    ```
    
- **执行所有包的脚本**：
    
    ```shell
    # 依次执行所有包中的 build 脚本 (pnpm 会自动处理依赖顺序)
    pnpm --recursive build
    ```
    
- **执行某个包及其所有依赖项的脚本**：`...` 语法表示“依赖于此项的所有包”或“此项的所有依赖”。
    
    ```shell
    # 构建 app-a 以及它的所有本地依赖 (如 shared-utils)
    pnpm build --filter @monorepo/app-a...
    ```
    

---

## 7. 构建与部署

### 1. 应用的容器化 (`Dockerfile`)

此流程专注于构建最终的应用产物并将其放入 Nginx 服务器。

Dockerfile

```dockerfile
# Stage 1: Build a specific app (e.g., app-a)
FROM node:18-alpine AS builder
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# 只复制构建所需的 package.json 文件和 lockfile 来利用缓存
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY apps/app-a/package.json ./apps/app-a/
COPY packages/shared-utils/package.json ./packages/shared-utils/ # 复制依赖包的 package.json

# 安装所有依赖
RUN pnpm install --frozen-lockfile

# 复制所有源代码
COPY . .

# 只构建目标应用 app-a
RUN pnpm --filter @monorepo/app-a build

# Stage 2: Production Nginx server
FROM nginx:alpine

# 从构建阶段复制 app-a 的产物
COPY --from=builder /app/apps/app-a/dist /usr/share/nginx/html
# 假设你的 nginx.conf 在项目根目录
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. CI/CD 流程 (`.github/workflows/ci.yml`)

工作流被简化，只保留安装和构建步骤。

YAML

```yaml
name: Build Monorepo Apps

on:
  push:
    branches: [main] # 监听 main 分支的 push 事件

jobs:
  build-app-a:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 8 # 指定 pnpm 版本

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18' # 指定 Node.js 版本
          cache: 'pnpm'      # 启用 pnpm 缓存

      - name: Install Monorepo Dependencies
        run: pnpm install --frozen-lockfile # 安装所有依赖

      - name: Build App A
        run: pnpm --filter @monorepo/app-a build # 构建 app-a

      # 后续可以添加部署步骤，例如构建并推送 Docker 镜像到容器注册表
      # - name: Build and Push Docker Image
      #   run: |
      #     docker build -t your-registry/app-a:latest .
      #     docker push your-registry/app-a:latest
```

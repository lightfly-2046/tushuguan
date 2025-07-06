# 图书馆 - 现代图书管理系统

一个使用现代技术栈构建的图书管理系统，包括前端和后端。

## 技术栈

### 前端
- **Next.js 15** - React框架
- **TypeScript** - 类型安全的JavaScript超集
- **TailwindCSS** - 实用优先的CSS框架
- **Axios** - HTTP客户端
- **Next-Cloudinary** - Cloudinary集成

### 后端
- **Strapi CMS** - 开源的无头CMS系统
- **Node.js** - JavaScript运行时环境
- **PostgreSQL (Neon)** - 云数据库

### 部署
- **Vercel** - 前端部署
- **Render** - 后端部署
- **Cloudinary CDN** - 媒体存储

## 项目结构

```
tushuguan/
├── frontend/          # Next.js前端项目
│   ├── src/
│   │   ├── app/       # 页面组件
│   │   ├── components/# UI组件
│   │   ├── lib/       # 工具库
│   │   └── types/     # TypeScript类型定义
│   └── public/        # 静态资源
└── backend/           # Strapi CMS后端
    ├── config/        # 配置文件
    ├── src/
    │   ├── api/       # API定义
    │   └── admin/     # 管理界面配置
    └── database/      # 数据库配置
```

## 快速开始

### 前端开发

```bash
cd frontend
npm install
npm run dev
```

前端将在 http://localhost:3000 运行。

### 后端开发

```bash
cd backend
npm install
npm run develop
```

后端将在 http://localhost:1337 运行，管理界面在 http://localhost:1337/admin。

## 数据库配置

本项目使用Neon PostgreSQL作为数据库。请确保在`.env`文件中正确配置数据库连接信息。

## 部署

### 前端部署到Vercel

1. 将代码推送到GitHub仓库
2. 在Vercel上导入项目
3. 配置环境变量
4. 部署

### 后端部署到Render

1. 在Render上创建新的Web Service
2. 连接到GitHub仓库
3. 配置环境变量
4. 部署

## 媒体存储

本项目使用Cloudinary存储媒体文件。请在前端的`.env.local`和后端的`.env`文件中配置Cloudinary凭证。

## 许可证

MIT
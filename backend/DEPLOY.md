# Render部署指南

本文档提供在Render上部署Strapi后端的详细步骤。

## 准备工作

1. 确保您已经有一个Render账户
2. 确保您已经创建了Neon PostgreSQL数据库
3. 确保您已经有Cloudinary账户和API密钥

## 部署步骤

### 1. 创建环境变量

在部署前，您需要准备以下环境变量：

```
# 基本配置
NODE_ENV=production
APP_KEYS=<随机生成的密钥，逗号分隔>
API_TOKEN_SALT=<随机生成的盐>
ADMIN_JWT_SECRET=<随机生成的JWT密钥>
JWT_SECRET=<随机生成的JWT密钥>

# 数据库配置
DATABASE_CLIENT=postgres
DATABASE_URL=<您的Neon PostgreSQL连接字符串>
DATABASE_SSL=true

# Cloudinary配置
CLOUDINARY_NAME=<您的Cloudinary云名称>
CLOUDINARY_KEY=<您的Cloudinary API密钥>
CLOUDINARY_SECRET=<您的Cloudinary API密钥>

# CORS配置
CORS_ORIGIN=<您的前端域名，如https://your-app.vercel.app>
```

### 2. 使用Render Blueprint部署

1. 将代码推送到GitHub仓库
2. 登录Render控制台
3. 点击"New"，然后选择"Blueprint"
4. 连接您的GitHub仓库
5. Render会自动检测`render.yaml`文件并配置服务
6. 填写所有必需的环境变量
7. 点击"Apply"开始部署

### 3. 手动部署（如果不使用Blueprint）

1. 在Render控制台中，点击"New"，然后选择"Web Service"
2. 连接您的GitHub仓库
3. 配置以下设置：
   - 名称：您选择的服务名称
   - 环境：Node
   - 区域：选择离您用户最近的区域
   - 分支：main（或您的主分支）
   - 构建命令：`npm install && npm run build`
   - 启动命令：`npm start`
4. 添加所有必需的环境变量
5. 点击"Create Web Service"开始部署

## 验证部署

部署完成后，您可以通过访问以下URL来验证API是否正常工作：

```
https://<your-render-service>.onrender.com/api
```

如果一切正常，您应该会看到Strapi的欢迎消息。

## 故障排除

如果部署失败，请检查Render日志以获取详细错误信息。常见问题包括：

1. 环境变量配置错误
2. 数据库连接问题
3. 构建过程中的依赖错误

如需更多帮助，请参考[Strapi部署文档](https://docs.strapi.io/dev-docs/deployment/render)和[Render文档](https://render.com/docs)。
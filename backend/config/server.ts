export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // 添加CORS配置
  cors: {
    enabled: true,
    origin: env.array('CORS_ORIGIN', ['http://localhost:3000', 'https://your-frontend-domain.vercel.app']), // 允许的前端域名
    headers: ['*'], // 允许所有请求头
  },
});

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // 动态CORS配置
  cors: {
    enabled: true,
    origin: env.array('CORS_ORIGIN') || [
      'http://localhost:3000',
      'http://localhost:5000',
      'https://your-frontend-domain.vercel.app'
    ],
    headers: ['*'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    credentials: true,
  },
  // 安全配置
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

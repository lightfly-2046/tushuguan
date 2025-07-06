'use client';

import { useState, useEffect } from 'react';
import { getStrapiURL } from '@/lib/api';

export default function TestPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // 直接使用fetch，不依赖自定义API函数
        const response = await fetch('http://localhost:1337/api/books');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`API请求失败: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('API响应:', result);
        setData(result);
      } catch (err) {
        console.error('获取数据时出错:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API测试页面</h1>
      
      {loading && <p>加载中...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>错误: {error}</p>
          <p>请确保Strapi后端正在运行，并且已经配置了正确的CORS设置。</p>
        </div>
      )}
      
      {data && (
        <div>
          <h2 className="text-xl font-semibold mb-2">API响应成功!</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
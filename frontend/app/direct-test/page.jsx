'use client';

import { useState, useEffect } from 'react';

export default function DirectTest() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function testDirectFetch() {
      try {
        setLoading(true);
        
        // 直接使用fetch，不通过API库
        const response = await fetch('https://tushuguan-backend.onrender.com/api/books?populate=*', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // 关闭credentials
          credentials: 'omit',
          // 添加时间戳避免缓存
          cache: 'no-cache',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP错误 ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setResult({
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries([...response.headers]),
          data: data
        });
      } catch (err) {
        console.error('直接请求测试失败:', err);
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    }
    
    testDirectFetch();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">直接API请求测试</h1>
      
      {loading && <p className="mb-4">加载中...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-6">
          <h2 className="text-xl font-bold mb-2">错误</h2>
          <p className="whitespace-pre-wrap">{error}</p>
        </div>
      )}
      
      {result && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">请求成功</h2>
          <div className="mb-4">
            <p><strong>状态码:</strong> {result.status} {result.statusText}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">响应头:</h3>
            <pre className="bg-gray-100 p-2 rounded overflow-auto text-xs">
              {JSON.stringify(result.headers, null, 2)}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">数据:</h3>
            <pre className="bg-gray-100 p-2 rounded overflow-auto text-xs">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        </div>
      )}
      
      <div>
        <a href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          返回首页
        </a>
      </div>
    </div>
  );
}
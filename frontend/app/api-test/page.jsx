'use client';

import { useState, useEffect } from 'react';

export default function APITest() {
  const [status, setStatus] = useState('正在测试连接...');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  const apiUrl = 'https://tushuguan-backend.onrender.com/api/books?populate=*';
  
  useEffect(() => {
    async function testConnection() {
      try {
        // 添加时间戳避免缓存
        const response = await fetch(`${apiUrl}&timestamp=${Date.now()}`);
        
        if (!response.ok) {
          throw new Error(`HTTP错误 ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
        setStatus('连接成功！');
      } catch (err) {
        console.error('API连接测试失败:', err);
        setError(`${err.message}`);
        setStatus('连接失败');
      }
    }
    
    testConnection();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">API连接测试</h1>
      
      <div className={`p-4 mb-6 rounded-lg ${
        status === '正在测试连接...' ? 'bg-yellow-100' : 
        status === '连接成功！' ? 'bg-green-100' : 'bg-red-100'
      }`}>
        <h2 className="text-xl font-semibold mb-2">连接状态</h2>
        <p className="text-lg">{status}</p>
        {error && <p className="text-red-600 mt-2">错误信息: {error}</p>}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">API地址</h2>
        <p className="font-mono bg-gray-100 p-2 rounded">{apiUrl}</p>
      </div>
      
      {data && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">API返回数据</h2>
          <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
            <h3 className="font-semibold mb-2">图书数量: {data.data?.length || 0}</h3>
            {data.data && data.data.length > 0 ? (
              <ul className="list-disc pl-5">
                {data.data.map(book => (
                  <li key={book.id} className="mb-2">
                    <span className="font-semibold">{book.attributes.title}</span>
                    {book.attributes.author?.data && (
                      <span className="text-gray-600"> - {book.attributes.author.data.attributes.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>暂无图书数据</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
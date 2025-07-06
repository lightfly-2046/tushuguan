'use client';

import { useState, useEffect } from 'react';

export default function TestAPIConnection() {
  const [status, setStatus] = useState('正在测试连接...');
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const apiUrl = 'https://tushuguan-backend.onrender.com/api/books';
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP错误 ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        setData(result);
        setStatus('连接成功！');
      })
      .catch(error => {
        console.error('API连接测试失败:', error);
        setStatus(`连接失败: ${error.message}`);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">API连接测试</h1>
      <p className="mb-4">状态: {status}</p>
      
      {data && (
        <div>
          <p>图书数量: {data.data?.length || 0}</p>
          <pre className="bg-gray-100 p-2 mt-4 overflow-auto max-h-96">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
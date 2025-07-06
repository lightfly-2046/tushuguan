'use client';

import { useState, useEffect } from 'react';
import { getBooks } from '../../lib/api';
import Link from 'next/link';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState({
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://tushuguan-backend.onrender.com',
    startTime: new Date().toISOString(),
  });

  useEffect(() => {
    async function loadBooks() {
      try {
        console.log('开始加载图书数据...');
        setLoading(true);
        
        // 添加时间戳避免缓存
        const timestamp = new Date().getTime();
        console.log(`调用API: ${debugInfo.apiUrl}/api/books?populate=*&_=${timestamp}`);
        
        const data = await getBooks();
        console.log('API返回数据:', data);
        
        setBooks(data.data || []);
        setDebugInfo(prev => ({
          ...prev,
          endTime: new Date().toISOString(),
          success: true,
          dataCount: data.data?.length || 0,
        }));
      } catch (err) {
        console.error('加载图书失败:', err);
        setError(`加载图书失败: ${err.message}`);
        setDebugInfo(prev => ({
          ...prev,
          endTime: new Date().toISOString(),
          success: false,
          errorMessage: err.message,
          errorDetails: err.response?.data || '无详细信息',
        }));
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, [debugInfo.apiUrl]);

  if (loading) {
    return <div className="text-center p-8">加载中...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">图书列表</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p className="font-bold">错误</p>
          <p>{error}</p>
          <details className="mt-2">
            <summary className="cursor-pointer">调试信息</summary>
            <pre className="bg-gray-100 p-2 mt-2 overflow-auto text-xs">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </details>
        </div>
      )}
      
      {!error && books.length === 0 ? (
        <div>
          <p>暂无图书</p>
          <details className="mt-4">
            <summary className="cursor-pointer">调试信息</summary>
            <pre className="bg-gray-100 p-2 mt-2 overflow-auto text-xs">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </details>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{book.attributes.title}</h2>
                <p className="text-gray-600 mb-2">
                  {book.attributes.author?.data ? book.attributes.author.data.attributes.name : '未知作者'}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {book.attributes.category?.data ? book.attributes.category.data.attributes.name : '未分类'}
                </p>
                <Link 
                  href={`/books/${book.id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  查看详情
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
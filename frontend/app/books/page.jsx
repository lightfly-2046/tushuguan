'use client';

import { useState, useEffect } from 'react';
import { getBooks } from '../../lib/api';
import Link from 'next/link';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBooks();
        console.log('图书数据:', data);
        setBooks(data.data || []);
      } catch (err) {
        setError(`加载图书失败: ${err.message}`);
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">图书列表</h1>
        <div className="text-sm text-gray-600">
          共 {books.length} 本图书
        </div>
      </div>
      
      {error && (
        <ErrorMessage 
          error={error} 
          onRetry={loadBooks}
        />
      )}
      
      {!error && books.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-medium text-gray-900">暂无图书</h3>
          <p className="mt-1 text-sm text-gray-500">开始添加您的第一本图书吧</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => {
            // 直接用API返回的字段，兼容attributes和无attributes两种情况
            const attrs = book.attributes || book;
            const bookTitle = attrs.Title || attrs.title || '未知书名';
            const author = attrs.author?.data?.attributes?.name || '未知作者';
            const description = attrs.description || '暂无简介';
            return (
              <div key={book.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{bookTitle}</h2>
                  <p className="text-gray-600 mb-4">
                    作者：{author}
                  </p>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                    {description}
                  </p>
                  <Link 
                    href={`/books/${book.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    查看详情
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

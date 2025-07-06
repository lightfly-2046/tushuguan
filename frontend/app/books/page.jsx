'use client';

import { useState, useEffect } from 'react';
import { getBooks } from '../../lib/api';
import Link from 'next/link';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        const data = await getBooks();
        setBooks(data.data || []);
      } catch (err) {
        console.error('加载图书失败:', err);
        setError('加载图书失败，请稍后再试');
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  if (loading) {
    return <div className="text-center p-8">加载中...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">图书列表</h1>
      
      {books.length === 0 ? (
        <p>暂无图书</p>
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
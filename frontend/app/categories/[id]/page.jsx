'use client';

import { useState, useEffect } from 'react';
import { getCategory, getCategoryBooks } from '../../../lib/api';
import Link from 'next/link';

export default function CategoryDetailPage({ params }) {
  const { id } = params;
  const [category, setCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [categoryData, booksData] = await Promise.all([
          getCategory(id),
          getCategoryBooks(id)
        ]);
        
        setCategory(categoryData.data);
        setBooks(booksData.data || []);
      } catch (err) {
        console.error(`加载分类ID:${id}失败:`, err);
        setError('加载分类详情失败，请稍后再试');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return <div className="text-center p-8">加载中...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (!category) {
    return <div className="text-center p-8">未找到分类</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Link href="/categories" className="text-blue-600 hover:underline">
          &larr; 返回分类列表
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{category.attributes.name}</h1>
          <p className="text-gray-700">{category.attributes.description || '暂无描述'}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">该分类下的图书</h2>
      
      {books.length === 0 ? (
        <p>该分类下暂无图书</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{book.attributes.title}</h3>
                <p className="text-gray-600 mb-2">
                  {book.attributes.author?.data ? book.attributes.author.data.attributes.name : '未知作者'}
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
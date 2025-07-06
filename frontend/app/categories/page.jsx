'use client';

import { useState, useEffect } from 'react';
import { getCategories } from '../../lib/api';
import Link from 'next/link';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data.data || []);
      } catch (err) {
        console.error('加载分类失败:', err);
        setError('加载分类失败，请稍后再试');
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  if (loading) {
    return <div className="text-center p-8">加载中...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">图书分类</h1>
      
      {categories.length === 0 ? (
        <p>暂无分类</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{category.attributes.name}</h2>
                <p className="text-gray-600 mb-4">{category.attributes.description || '暂无描述'}</p>
                <Link 
                  href={`/categories/${category.id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  查看分类下的图书
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
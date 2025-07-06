'use client';

import { useState, useEffect } from 'react';
import { getAuthors } from '../../lib/api';
import Link from 'next/link';

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAuthors() {
      try {
        setLoading(true);
        const data = await getAuthors();
        setAuthors(data.data || []);
      } catch (err) {
        console.error('加载作者失败:', err);
        setError('加载作者失败，请稍后再试');
      } finally {
        setLoading(false);
      }
    }

    loadAuthors();
  }, []);

  if (loading) {
    return <div className="text-center p-8">加载中...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">作者列表</h1>
      
      {authors.length === 0 ? (
        <p>暂无作者</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div key={author.id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{author.attributes.name}</h2>
                <p className="text-gray-600 mb-4">{author.attributes.bio ? author.attributes.bio.substring(0, 100) + '...' : '暂无简介'}</p>
                <Link 
                  href={`/authors/${author.id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  查看作者作品
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
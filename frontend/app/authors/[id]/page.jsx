'use client';

import { useState, useEffect } from 'react';
import { getAuthor, getAuthorBooks } from '../../../lib/api';
import Link from 'next/link';

export default function AuthorDetailPage({ params }) {
  const { id } = params;
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [authorData, booksData] = await Promise.all([
          getAuthor(id),
          getAuthorBooks(id)
        ]);
        
        setAuthor(authorData.data);
        setBooks(booksData.data || []);
      } catch (err) {
        console.error(`加载作者ID:${id}失败:`, err);
        setError('加载作者详情失败，请稍后再试');
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

  if (!author) {
    return <div className="text-center p-8">未找到作者</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Link href="/authors" className="text-blue-600 hover:underline">
          &larr; 返回作者列表
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{author.attributes.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 whitespace-pre-line">{author.attributes.bio || '暂无简介'}</p>
            </div>
            
            <div>
              {author.attributes.photo?.data && (
                <img 
                  src={author.attributes.photo.data.attributes.url} 
                  alt={`${author.attributes.name}的照片`}
                  className="w-full h-auto rounded shadow"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">该作者的作品</h2>
      
      {books.length === 0 ? (
        <p>该作者暂无作品</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{book.attributes.title}</h3>
                <p className="text-gray-600 mb-2">
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
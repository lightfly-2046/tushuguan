'use client';

import { useState, useEffect } from 'react';
import { getBook } from '../../../lib/api';
import Link from 'next/link';

export default function BookDetailPage({ params }) {
  const { id } = params;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBook() {
      try {
        setLoading(true);
        const data = await getBook(id);
        setBook(data.data);
      } catch (err) {
        console.error(`加载图书ID:${id}失败:`, err);
        setError('加载图书详情失败，请稍后再试');
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [id]);

  if (loading) {
    return <div className="text-center p-8">加载中...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (!book) {
    return <div className="text-center p-8">未找到图书</div>;
  }

  const { attributes } = book;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Link href="/books" className="text-blue-600 hover:underline">
          &larr; 返回图书列表
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{attributes.Title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">图书信息</h2>
              <p className="mb-2">
                <span className="font-semibold">作者：</span>
                {attributes.author?.data ? attributes.author.data.attributes.name : '未知'}
              </p>
              <p className="mb-2">
                <span className="font-semibold">分类：</span>
                {attributes.categories?.data && attributes.categories.data.length > 0 
                  ? attributes.categories.data.map(cat => cat.attributes.name).join(', ') 
                  : '未分类'}
              </p>
              <p className="mb-2">
                <span className="font-semibold">出版社：</span>
                {attributes.publisher?.data ? attributes.publisher.data.attributes.name : '未知'}
              </p>
              <p className="mb-2">
                <span className="font-semibold">ISBN：</span>
                {attributes.isbn || '未知'}
              </p>
              <p className="mb-2">
                <span className="font-semibold">出版日期：</span>
                {attributes.publishDate ? new Date(attributes.publishDate).toLocaleDateString('zh-CN') : '未知'}
              </p>
            </div>
            
            <div>
              {attributes.cover?.data && (
                <img 
                  src={attributes.cover.data.attributes.url} 
                  alt={`${attributes.Title}的封面`}
                  className="w-full h-auto rounded shadow"
                />
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">简介</h2>
            <p className="text-gray-700 whitespace-pre-line">{attributes.descript || '暂无简介'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
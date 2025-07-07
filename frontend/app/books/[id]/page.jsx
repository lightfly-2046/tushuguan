'use client';

import { use, useState, useEffect } from 'react';
import { getBook } from '../../../lib/api';
import Link from 'next/link';

export default function BookDetailPage({ params }) {
  // 兼容 Next.js 13+，params 可能是 Promise
  const realParams = typeof params?.then === 'function' ? use(params) : params;
  const id = realParams?.id ? (Array.isArray(realParams.id) ? realParams.id[0] : realParams.id) : '';

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('无效的图书ID');
      setLoading(false);
      return;
    }
    async function loadBook() {
      try {
        setLoading(true);
        setError(null);
        const data = await getBook(id);
        console.log('图书详情数据:', data);
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

  // 安全地获取图书数据
  const getBookData = () => {
    try {
      const { attributes } = book;
      return {
        title: attributes?.Title || '未知书名',
        author: attributes?.author?.data?.attributes?.name || '未知作者',
        categories: attributes?.categories?.data 
          ? attributes.categories.data.map(cat => cat.attributes.name).join(', ') 
          : '未分类',
        isbn: attributes?.isbn || '未知',
        publishedDate: attributes?.publishedDate 
          ? new Date(attributes.publishedDate).toLocaleDateString('zh-CN') 
          : '未知',
        pages: attributes?.pages || '未知',
        language: attributes?.language || '未知',
        description: attributes?.description || '暂无简介',
        coverUrl: attributes?.cover?.data?.attributes?.url || null
      };
    } catch (e) {
      console.error('解析图书详情数据错误:', e);
      return {
        title: '数据错误',
        author: '未知',
        categories: '未知',
        isbn: '未知',
        publishedDate: '未知',
        pages: '未知',
        language: '未知',
        description: '数据解析错误',
        coverUrl: null
      };
    }
  };

  const bookData = getBookData();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Link href="/books" className="text-blue-600 hover:underline">
          &larr; 返回图书列表
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{bookData.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">图书信息</h2>
              <p className="mb-2">
                <span className="font-semibold">作者：</span>
                {bookData.author}
              </p>
              <p className="mb-2">
                <span className="font-semibold">分类：</span>
                {bookData.categories}
              </p>
              <p className="mb-2">
                <span className="font-semibold">ISBN：</span>
                {bookData.isbn}
              </p>
              <p className="mb-2">
                <span className="font-semibold">出版日期：</span>
                {bookData.publishedDate}
              </p>
              <p className="mb-2">
                <span className="font-semibold">页数：</span>
                {bookData.pages}
              </p>
              <p className="mb-2">
                <span className="font-semibold">语言：</span>
                {bookData.language}
              </p>
            </div>
            
            <div>
              {bookData.coverUrl && (
                <img 
                  src={bookData.coverUrl} 
                  alt={`${bookData.title}的封面`}
                  className="w-full h-auto rounded shadow"
                />
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">简介</h2>
            <p className="text-gray-700 whitespace-pre-line">{bookData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}